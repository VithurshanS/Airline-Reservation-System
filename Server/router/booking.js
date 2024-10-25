const express = require('express');
const router = express.Router();
const {addBooking,getBooking,bookseat} = require('../controller/bookingController')

router.post('/addbooking',addBooking);
router.get('/getbooking',getBooking);
router.post('/bookseats',bookseat);

module.exports = router;