const express = require('express');
const router = express.Router();
const {addSchedule,getSchedule} = require('../controller/scheduleController')

router.post('/addschedule',addSchedule);
router.get('/getschedule',getSchedule);

module.exports = router;