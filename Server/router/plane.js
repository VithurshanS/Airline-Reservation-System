const express = require('express');
const router = express.Router();
const {addPlane,getPlane} = require('../controller/planeController');

router.post('/addPlane',addPlane);
router.get('/getPlane/:id',getPlane);


module.exports = router;