const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');


router.get('/passengers-by-age/:flight_no', reportController.getPassengersByAge);


router.get('/passenger-count-by-destination', reportController.getPassengerCountByDestination);


router.get('/bookings-by-category', reportController.getBookingsByCategory);

router.get('/past-flights', reportController.getPastFlights);

module.exports = router;