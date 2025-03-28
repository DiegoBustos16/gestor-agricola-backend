const { IrrigationLog } = require('../models');
const { Op } = require('sequelize');

exports.getIrrigationLogsByWaterShift = async (req, res) => {
  try {
    const { waterShiftId } = req.params;
    const logs = await IrrigationLog.findAll({ where: { waterShiftId } });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllIrrigationLogs = async (req, res) => {
  try {
    const logs = await IrrigationLog.findAll();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getIrrigationLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await IrrigationLog.findByPk(id);
    if (!log)
      return res.status(404).json({ message: 'Irrigation Log no encontrado' });
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createIrrigationLog = async (req, res) => {
  try {
    const { quadrant, startDate, finishDate, waterShiftId } = req.body;

    const overlappingLogs = await IrrigationLog.findAll({
      where: {
        quadrant,
        waterShiftId,
        [Op.and]: [
          { startDate: { [Op.lt]: finishDate } },
          { finishDate: { [Op.gt]: startDate } }
        ]
      }
    });

    if (overlappingLogs.length > 0) {
      return res.status(400).json({
        message: 'El nuevo registro se solapa con uno existente para este cuartel y turno.'
      });
    }

    const newLog = await IrrigationLog.create({ quadrant, startDate, finishDate, waterShiftId });
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIrrigationLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { quadrant, startDate, finishDate, waterShiftId } = req.body;

    const overlappingLogs = await IrrigationLog.findAll({
      where: {
        id: { [Op.ne]: id },
        quadrant,
        waterShiftId,
        [Op.and]: [
          { startDate: { [Op.lt]: finishDate } },
          { finishDate: { [Op.gt]: startDate } }
        ]
      }
    });

    if (overlappingLogs.length > 0) {
      return res.status(400).json({
        message: 'El registro actualizado se solapa con uno existente para este cuartel y turno'
      });
    }

    const log = await IrrigationLog.findByPk(id);
    if (!log)
      return res.status(404).json({ message: 'Irrigation Log no encontrado' });

    log.quadrant = quadrant;
    log.startDate = startDate;
    log.finishDate = finishDate;
    log.waterShiftId = waterShiftId;
    await log.save();
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIrrigationLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IrrigationLog.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: 'Irrigation Log no encontrado' });
    res.status(200).json({ message: 'Irrigation Log eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};