const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

db.connect((error)=>{
    if(error){
        console.log("error occured",error);
    }
    else{
        console.log("database successfully connected");
    }
})

app.post('/signup',async (req,res)=>{
    const {username,password} = await req.body;
    const query = 'insert into Passenger (Username,Password) values (?,?);';
    db.query(query,[username,password],(err,result)=>{
        if(err){
            console.log("error when inserting data");
        }
        res.json(result);
    })
})

app.post('signup/details', async (req,res)=>{
    
})



app.get('/display',(req,res)=>{
    const query = 'select * from Passenger;';
    db.query(query,(err,result)=>{
        if(err){
            console.log(fuck);
        }
        res.send(result)
        console.log(result);
    })
})

app.listen(3066,()=>{
    console.log('server started');
})