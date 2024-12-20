const db = require('../database');

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
        const Schedule_ID = req.params.scheduleid;
        try {
            const results = await seatModel.getSeat(Schedule_ID);
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

    exports.bookseats = async (req,res)=>{
            const {seat} = req.body;
            try{
                const results = await seatModel.bookSeat(seat);
                res.send({ "message": "Successfully booked seats.", "results": results });
            }catch(err){
                console.log(err);
                res.status(500).send({"message":"Failed to book seats."});
            }

    };
    exports.getseatDetails = async (req, res) => {
        const Schedule_ID = req.params.scheduleid;
        try {
            const results = await seatModel.getse(Schedule_ID);
            res.send({ "message": "Successfully retrieved seats.", "results": results });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when getting seats." });
        }
    };

    exports.addselectedseats = async (req, res) => {
        const {seats} = req.body;
        try {
            const results = await seatModel.addselectedseats(seats);
            res.status(200).send({"message": "Successfully added", "results": results});
        }catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when adding", "error": error });
        }

    };
    exports.removeselectseat = async (req, res) => {
        const {seats} = req.body;
        try {
            const results = await seatModel.removeselectedseats(seats);
            res.status(200).send({"message": "Successfully added", "results": results});
        }catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Error occurred when removing", "error": error });
        }
    };