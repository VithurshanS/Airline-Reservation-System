const express = require('express');
const router = express.Router();
const {addAirport,getAirport} = require('../controller/airportController');

router.post('/addairport', addAirport);

/*{
  "Airport_Code":"MAA",
  "Airport_name":"chennai international Airport",
  "Location":["porur","chennai","tamilnadu","India"]
}
*/

router.get('/getairport', getAirport);

module.exports = router;