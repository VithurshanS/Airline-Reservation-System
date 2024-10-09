const db = require('../database');



exports.addGuest = async (req,res)=>{
    const {Passenger_Name,Passport_Number,DOB,Gender} = req.body;
    const insertGuest = `INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES (UUID(),?,?,?,?);`;
    db.query(insertGuest,[Passenger_Name,Passport_Number,DOB,Gender],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add guest."});
        } else {
            res.send({"message":"Guest added successfully.","result":result});
        }
    });
}

exports.getGuest = async (req,res)=>{
    const {Passport_Number} = req.body;
    const getGuests = `SELECT * FROM Passenger where Passport_Number = ?;`;
    db.query(getGuests,[Passport_Number],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to get guests."});
        } else {
            res.send({"message":"Guests retrieved successfully.","result":result[0]});
        }
    });
}