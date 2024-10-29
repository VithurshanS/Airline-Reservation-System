const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const db = require('./database')
const user = require('./router/user');
//const bodyParser = require('body-parser');
const passenger = require('./router/passenger');
const address = require('./router/address');
const airport = require('./router/airport');
const route = require('./router/route');
const plane = require('./router/plane');
const aircraft = require('./router/aircraft');
const schedule = require('./router/schedule');
const booking = require('./router/booking');
const seat = require('./router/seat');



const app = express();
app.use(cors());
//app.use(bodyParser.json());




app.use(express.json());
app.use('/',user)
app.use('/',passenger);
app.use('/',address);
app.use('/',airport)
app.use('/',route);
app.use('/',plane);
app.use('/',aircraft);
app.use('/',schedule);
app.use('/',booking);
app.use('/',seat);






app.listen(3066,()=>{
    console.log('server started');
})