const express = require('express');
const router = express.Router();

const {addAircraft, getAircraft} = require('../controller/aircraftController.js');

router.post('/addaircraft',addAircraft);
router.get('/getaircraft/:id',getAircraft);

module.exports = router;