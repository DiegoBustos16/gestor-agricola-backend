const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { IrrigationLog } = require('../models');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(recipients, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipients,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${recipients}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
}

async function startScheduler() {
  const emailRecipients = process.env.EMAIL_RECIPIENTS.split(',').map(email => email.trim());
  if (!emailRecipients.length) throw new Error('No email recipients configured');

  cron.schedule('* * * * *', async () => {
    console.log('Checking irrigation logs for notifications');
    const now = new Date();
    const logs = await IrrigationLog.findAll();
    for (const log of logs) {
      const finishDate = new Date(log.finishDate);
      const oneHourBefore = new Date(finishDate.getTime() - 60 * 60 * 1000);
      const thirtyMinBefore = new Date(finishDate.getTime() - 30 * 60 * 1000);

      if (now >= oneHourBefore && now < thirtyMinBefore && now.getMinutes() === oneHourBefore.getMinutes()) {
        await sendEmail(emailRecipients, 'Aviso de Riego', `En 1 hora cambiar el agua del cuartel ${log.quadrant}`);
      } else if (now >= thirtyMinBefore && now < finishDate && now.getMinutes() === thirtyMinBefore.getMinutes()) {
        await sendEmail(emailRecipients, 'Aviso de Riego', `En media hora cambiar el agua del cuartel ${log.quadrant}`);
      }
    }
  });
}

module.exports = { startScheduler };