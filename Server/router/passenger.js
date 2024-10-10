const express = require('express');
const router = express.Router();
const {addGuest,getGuest} = require('../controller/passengerController');
const db = require('../database');



router.post('/addguest',addGuest);
router.get('/guest',getGuest);
router.get('/getall',(req,res)=>{
    const queri = `select * from user;`;
    db.query(queri,(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send({"message":"cannot found"})
        } else {
            res.status(200).send({"message":"got that","result":result});
        }
    })

})


module.exports = router;