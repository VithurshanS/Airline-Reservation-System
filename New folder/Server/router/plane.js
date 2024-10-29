const express = require('express');
const router = express.Router();
const {addPlane,getPlane} = require('../controller/planeController');

router.post('/addplane',addPlane);
router.get('/getplane/:id',getPlane);


module.exports = router;