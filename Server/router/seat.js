const express = require('express');
const router = express.Router();
const {addSeat,getSeat} = require('../controller/seatController');




router.post('/addseat',addSeat);
router.get('/getseat',getSeat);

module.exports = router;