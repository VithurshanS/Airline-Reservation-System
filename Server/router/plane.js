const express = require('express');
const router = express.Router();
const {addPlane,getPlane,getAllPlanes} = require('../controller/planeController');

router.post('/addplane',addPlane);
router.get('/getplane/:id',getPlane);
router.get('/getallplane',getAllPlanes);


module.exports = router;