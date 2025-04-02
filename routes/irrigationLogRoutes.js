const express = require('express');
const router = express.Router();
const irrigationLogController = require('../controllers/irrigationLogController');

router.get('/', irrigationLogController.getAllIrrigationLogs);
router.get('/history', irrigationLogController.getHistory);

router.get('/water-shift/:waterShiftId(\\d+)', irrigationLogController.getIrrigationLogsByWaterShift);
router.get('/:id(\\d+)', irrigationLogController.getIrrigationLogById);
router.put('/:id(\\d+)', irrigationLogController.updateIrrigationLog);
router.delete('/:id(\\d+)', irrigationLogController.deleteIrrigationLog);

router.post('/', irrigationLogController.createIrrigationLog);

module.exports = router;
