const express = require('express');
const router = express.Router();
const quadrantController = require('../controllers/quadrantController');

router.get('/', quadrantController.getQuadrants);

module.exports = router;
