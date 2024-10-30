const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');


router.get('/passengers-by-age/:flight_no', reportController.getPassengersByAge);
router.post('/passenger-count-by-destination', reportController.getPassengerCountByDestination);
router.post('/bookings-by-category', reportController.getBookingsByCategory);
router.post('/past-flights', reportController.getPastFlights);
router.get('/revenue-by-aircraft', reportController.getRevenueByAircraft);

module.exports = router;
