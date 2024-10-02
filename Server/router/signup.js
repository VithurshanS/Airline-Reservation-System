const express = require('express');
const router = express.Router();
const { addPassengerDetails} = require('../controller/passengerController');

router.post('/details', addPassengerDetails);

module.exports = router;