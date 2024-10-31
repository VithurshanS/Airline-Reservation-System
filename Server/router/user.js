const express = require('express');
const router = express.Router();
const {addDetails,getDetails,getview} = require("../controller/userController");


router.post("/signup",addDetails);
router.post("/login",getDetails);
router.post("/getviewof",getview);

module.exports = router;
