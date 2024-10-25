const express = require('express');
const router = express.Router();
const {addDetails,getDetails} = require("../controller/userController");


router.post("/add",addDetails);
router.post("/get",getDetails);

module.exports = router;