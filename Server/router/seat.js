const express = require('express');
const router = express.Router();
const {addSeat,getSeat,getselectedSeat,getbookedSeat,getavailableSeat,bookSeats} = require('../controller/seatController');




router.get('/getseat/:scheduleid',getSeat);
router.get('/getavailableseats/:scheduleid',getavailableSeat);
router.get('/getbookedseats/:scheduleid',getbookedSeat);
router.get('/getselectedseats/:scheduleid',getselectedSeat);
router.post('/bookseats', bookSeats);

module.exports = router;