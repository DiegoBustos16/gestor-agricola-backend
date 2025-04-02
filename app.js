
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api/water-shifts', require('./routes/waterShiftRoutes'));
app.use('/api/irrigation-logs', require('./routes/irrigationLogRoutes'));
app.use('/api/quadrants', require('./routes/quadrantRoutes'));

const { startScheduler } = require('./services/emailScheduler');
app.listen(port, async () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
  await startScheduler();
});