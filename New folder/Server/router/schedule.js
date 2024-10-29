const express = require('express');
const router = express.Router();
const {addSchedule,getSchedule,getsched} = require('../controller/scheduleController')

router.post('/addschedule',addSchedule);
router.get('/getscheduleall',getSchedule);
router.post('/getschedule',getsched);
module.exports = router;