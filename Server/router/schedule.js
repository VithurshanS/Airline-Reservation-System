const express = require('express');
const router = express.Router();
const {addSchedule,getSchedule,getsched,getSchedulewithaddress,getschedwithaddress} = require('../controller/scheduleController')

router.post('/addschedule',addSchedule);
router.get('/getscheduleall',getSchedule);
router.post('/getschedule',getsched);
router.get('/getscheduleallwithaddress',getSchedulewithaddress); //
router.post('/getschedulewithaddress',getschedwithaddress);

module.exports = router;