const express = require('express');
const router = express.Router();
const {addGuest,getGuest} = require('../controller/passengerController');


router.post('/addguest',addGuest);
router.get('/guest',getGuest);


module.exports = router;