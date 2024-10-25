const express = require('express');
const router = express.Router();
const {addBooking,getBooking} = require('../controller/bookingController')

router.post('/addbooking',addBooking);
router.get('/getbooking',getBooking);

module.exports = router;