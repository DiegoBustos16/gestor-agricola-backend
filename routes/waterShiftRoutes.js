const express = require('express');
const router = express.Router();
const waterShiftController = require('../controllers/waterShiftController');

router.get('/', waterShiftController.getAllWaterShifts);

router.get('/:id(\\d+)', waterShiftController.getWaterShiftById);
router.put('/:id(\\d+)', waterShiftController.updateWaterShift);
router.delete('/:id(\\d+)', waterShiftController.deleteWaterShift);

router.post('/', waterShiftController.createWaterShift);

module.exports = router;
