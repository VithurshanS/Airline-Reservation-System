const express = require('express');
const router = express.Router();
const {addRoute,getRoute,getAllRoute} = require('../controller/routeController');

router.post('/addroute',addRoute);
router.get('/getroute/:id',getRoute);
router.get('/getallroute',getAllRoute);

module.exports = router;
