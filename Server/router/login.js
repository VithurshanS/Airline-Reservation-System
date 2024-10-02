const express = require('express');
const router = express.Router();
const {loginPassenger} = require("../controller/passengerController");

router.post("/login",loginPassenger);

module.exports = router;
