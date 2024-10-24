const db = require('../database');

const passengerModel = require('../models/passengerModel');



    // Start of Selection
    exports.addGuest = async (req, res) => {
        const { Passenger_Name, Passport_Number, DOB, Gender } = req.body;
        try {
            const insertId = await passengerModel.addPassenger(Passenger_Name, Passport_Number, DOB, Gender);
            res.send({ "message": "Guest added successfully.", "result": insertId });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Failed to add guest." });
        }
    };
    
    exports.getGuest = async (req, res) => {
        const { Passport_Number }= req.body;
        try {
            const guest = await passengerModel.getPassengerByPassportNumber(Passport_Number);
            res.send({ "message": "Guests retrieved successfully.", "result": guest });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Failed to get guests." });
        }
    };