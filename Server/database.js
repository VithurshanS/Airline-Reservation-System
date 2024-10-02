const express = require('express')
require('dotenv').config();
const mysql = require('mysql2');

const database = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

database.connect((err)=>{
    if(err){
        console.log("error when connect the database");
    }else{
        console.log("database connected successfully");
    }
})

module.exports = database;

