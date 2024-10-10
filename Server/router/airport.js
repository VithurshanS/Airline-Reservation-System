const express = require('express');
const router = express.Router();
const {addAirport,getAirport} = require('../controller/airportController');

router.post('/addairport', addAirport);

router.get('/getairport', getAirport);

module.exports = router;