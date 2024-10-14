const db = require('../database');

exports.addBooking = async (req,res)=>{
    const {Schedule_ID,Passenger_ID, User_ID,Seat_ID,Final_Price,Booking_Status} = req.body; // here i want to declare a function that must calculate the final price
    const insertBooking = `INSERT INTO booking (Booking_ID, Schedule_ID, Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status) VALUES (UUID(),?,?,?,?,?,?);`;
    db.query(insertBooking,[Schedule_ID,Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add booking."});
        } else {
            res.send({"message":"Booking added successfully.","result":result});
        }
    });
}

exports.getBooking = async (req,res)=>{
    const getquery = `SELECT * FROM booking;`;
    db.query(getquery,(error,result)=>{
        if(error){
            res.send({"message":"error occured when get booking"});
        } else{
            res.send({"message":"successfully get","results":result});
        }
    });
};