const express = require('express');
const router = express.Router();
const {addLocation,getLocation} = require('../controller/addressController');


router.post('/addlocation',addLocation);
router.get('/getlocation/:id',getLocation);


module.exports = router;
