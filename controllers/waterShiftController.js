const { WaterShift } = require('../models');

exports.getAllWaterShifts = async (req, res) => {
  try {
    const waterShifts = await WaterShift.findAll();
    res.status(200).json(waterShifts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWaterShiftById = async (req, res) => {
  try {
    const { id } = req.params;
    const waterShift = await WaterShift.findByPk(id);
    if (!waterShift)
      return res.status(404).json({ message: 'Water Shift no encontrado' });
    res.status(200).json(waterShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createWaterShift = async (req, res) => {
  try {
    const { startDate, finishDate } = req.body;
    const newWaterShift = await WaterShift.create({ startDate, finishDate });
    res.status(201).json(newWaterShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWaterShift = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, finishDate } = req.body;
    const waterShift = await WaterShift.findByPk(id);
    if (!waterShift)
      return res.status(404).json({ message: 'Water Shift no encontrado' });
    waterShift.startDate = startDate;
    waterShift.finishDate = finishDate;
    await waterShift.save();
    res.status(200).json(waterShift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWaterShift = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WaterShift.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ message: 'Water Shift no encontrado' });
    res.status(200).json({ message: 'Water Shift eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
