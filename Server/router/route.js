const express = require('express');
const router = express.Router();
const {addRoute} = require('../controller/routeController');

router.post('/addroute',addRoute);

module.exports = router;
