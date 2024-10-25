const db = require('../database');
const bookingModel = require('../models/bookingModel');



exports.bookseat = async (req,res)=>{
    try{
        const {seats} = req.body;
        seats.forEach(seat => {
           bookingModel.bookSeat(seat);
        });
        res.status(200).send({"message":"booked"});
    }catch(e){
        res.status(500).send({"message":"Failed to book seats"});
    }
};
exports.addBooking = async (req, res) => {
    try {
        const { Passenger_ID, User_ID, Seat_ID} = req.body; // here i want to declare a function that must calculate the final price
        const insertId = await bookingModel.insertBooking(Passenger_ID, User_ID, Seat_ID);
        res.send({ "message": "Booking added successfully.", "result": insertId });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to add booking." });
    }
};

exports.getBooking = async (req, res) => {
    try {
        const results = await bookingModel.getBooking();
        res.send({ "message": "successfully get", "results": results });
    } catch (error) {
        res.send({ "message": "error occured when get booking" });
    }
};