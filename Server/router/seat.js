const express = require('express');
const router = express.Router();
const {addSeat,getSeat,getselectedSeat,getbookedSeat,getavailableSeat,bookseats,getseatDetails,addselectedseats,removeselectseat} = require('../controller/seatController');




router.get('/getseats/:scheduleid',getSeat);
router.get('/getavailableseats/:scheduleid',getavailableSeat);
router.get('/getbookedseats/:scheduleid',getbookedSeat);
router.get('/getselectedseats/:scheduleid',getselectedSeat);
router.get('/getseatdetails/:scheduleid',getseatDetails);
router.post('/addselectedseat',addselectedseats);
router.post('/removeselectedseat',removeselectseat)
router.post('/bookseat', bookseats);

module.exports = router;