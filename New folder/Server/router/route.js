const express = require('express');
const router = express.Router();
const {addRoute,getRoute} = require('../controller/routeController');

router.post('/addroute',addRoute);
router.get('/getroute/:id',getRoute);

module.exports = router;
