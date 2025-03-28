const express = require('express');
const router = express.Router();
const waterShiftController = require('../controllers/waterShiftController');

router.get('/', waterShiftController.getAllWaterShifts);
router.get('/:id', waterShiftController.getWaterShiftById);
router.post('/', waterShiftController.createWaterShift);
router.put('/:id', waterShiftController.updateWaterShift);
router.delete('/:id', waterShiftController.deleteWaterShift);

module.exports = router;
