const db = require('../database');


    // Start of Selection
    const seatModel = require('../models/seatModel');

    exports.addSeat = async (req, res) => {
        const { Schedule_ID, Seat_number, Seat_class, Seat_status } = req.body;
        try {
            const result = await seatModel.addSeat(Schedule_ID, Seat_number, Seat_class, Seat_status);
            res.send({ "message": "Seat added successfully.", "result": result });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Failed to add seat." });
        }
    };

    exports.getSeat = async (req, res) => {
        try {
            const results = await seatModel.getSeat();
            res.send({ "message": "Successfully retrieved seats.", "results": results });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when getting seats." });
        }
    };

    exports.getavailableSeat = async (req, res) => {
        const Schedule_ID = req.params.scheduleid;
        try {
            const results = await seatModel.getavailableSeat(Schedule_ID);
            res.send({ "message": "Successfully retrieved available seats.", "results": results });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when getting available seats for schedule." });
        }
    };

    exports.getbookedSeat = async (req, res) => {
        const Schedule_ID = req.params.scheduleid;
        try {
            const results = await seatModel.getbookedSeat(Schedule_ID);
            res.send({ "message": "Successfully retrieved booked seats.", "results": results });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when getting booked seats for schedule." });
        }
    };

    exports.getselectedSeat = async (req, res) => {
        const Schedule_ID = req.params.scheduleid;
        try {
            const results = await seatModel.getselectedSeat(Schedule_ID);
            res.send({ "message": "Successfully retrieved selected seats.", "results": results });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when getting selected seats for schedule." });
        }
    };

    exports.bookSeats = async (req, res) => {
        const { selectedSeats } = req.body;
        try {
            const result = await seatModel.bookSeats(selectedSeats);
            res.send({ "message": "Seats booked successfully.", "result": result });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Failed to book seats." });
        }
    };
