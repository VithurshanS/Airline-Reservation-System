
const { addressadder } = require('./addressController');
const airportModel = require('../models/airportModel');



exports.addAirport = async (req, res) => {
    const { Airport_Code, Airport_name, Location } = req.body;
    try {
        const addressID = await addressadder(Location);
        const insertId = await airportModel.insertAirport(Airport_Code, Airport_name, addressID);
        res.send({ "message": "Airport added successfully.", "airportID": insertId });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to add airport." });
    }
}

exports.getAirport = async (req, res) => {
    try {
        const airports = await airportModel.getAllAirports();
        res.send({ "message": "Airports retrieved successfully.", "result": airports });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to get airports." });
    }
}