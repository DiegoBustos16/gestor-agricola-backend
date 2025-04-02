const express = require('express');
const router = express.Router();
const irrigationLogController = require('../controllers/irrigationLogController');

router.get('/', irrigationLogController.getAllIrrigationLogs);
router.get('/history', irrigationLogController.getHistory);
router.get('/:id', irrigationLogController.getIrrigationLogById);
router.post('/', irrigationLogController.createIrrigationLog);
router.put('/:id', irrigationLogController.updateIrrigationLog);
router.delete('/:id', irrigationLogController.deleteIrrigationLog);
router.get('/water-shift/:waterShiftId', irrigationLogController.getIrrigationLogsByWaterShift);
module.exports = router;
