const express = require('express');
const router = express.Router();

const {addAircraft, getAircraft,getallaircraft} = require('../controller/aircraftController.js');

router.post('/addaircraft',addAircraft);
router.get('/getaircraft/:id',getAircraft);
router.get('/getallaircraft' , getallaircraft)


module.exports = router;