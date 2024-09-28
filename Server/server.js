const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./database')
const signup = require('./signup')
//const bodyParser = require('body-parser');



const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());
app.use('/signup',signup);




app.get('/display',(req,res)=>{
    const query = 'select * from Passenger;';
    db.query(query,(err,result)=>{
        if(err){
            console.log("error occured");
        }
        res.send(result)
        console.log(result);
    })
})




app.listen(3066,()=>{
    console.log('server started');
})