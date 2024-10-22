const db = require('../database');

exports.addBooking = async (req, res) => {
    try {
        const { Schedule_ID, Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status } = req.body; // here i want to declare a function that must calculate the final price
        const insertId = await insertBooking(Schedule_ID, Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status);
        res.send({ "message": "Booking added successfully.", "result": insertId });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to add booking." });
    }
};

exports.getBooking = async (req, res) => {
    try {
        const results = await getBooking();
        res.send({ "message": "successfully get", "results": results });
    } catch (error) {
        res.send({ "message": "error occured when get booking" });
    }
};