const express = require('express');
const router = express.Router();
const {addDetails,getDetails} = require("../controller/userController");


router.post("/signup",addDetails);
router.post("/login",getDetails);

module.exports = router;