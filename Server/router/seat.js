const express = require('express');
const router = express.Router();
const {addSeat,getSeat,getselectedSeat,getbookedSeat,getavailableSeat,bookseats} = require('../controller/seatController');




router.get('/getseats/:scheduleid',getSeat);
router.get('/getavailableseats/:scheduleid',getavailableSeat);
router.get('/getbookedseats/:scheduleid',getbookedSeat);
router.get('/getselectedseats/:scheduleid',getselectedSeat);
router.post('/bookseat', bookseats);

module.exports = router;