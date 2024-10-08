const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./database')
const user = require('./router/user');
//const bodyParser = require('body-parser');



const app = express();
app.use(cors());
//app.use(bodyParser.json());




app.use(express.json());
app.use('/user',user)






app.listen(3066,()=>{
    console.log('server started');
})