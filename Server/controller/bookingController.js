const db = require('../database');
const bookingModel = require('../models/bookingModel');

exports.addBooking = async (req, res) => {
    try {
        const { Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status } = req.body; // here i want to declare a function that must calculate the final price
        const insertId = await bookingModel.insertBooking(Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status);
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