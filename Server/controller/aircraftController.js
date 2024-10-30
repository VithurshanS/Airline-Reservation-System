const aircraftModel = require('../models/aircraftModel');

exports.addAircraft = async (req,res)=>{
    const {company,AircraftType,totalseats,ESSN,BSSN,PSSN} = req.body;
    try {
        const result = await aircraftModel.addAircraftQ(company,AircraftType,totalseats,ESSN,BSSN,PSSN);
        res.send({"message":result});
    } catch (error) {
        res.status(500).send({"message":"Failed to add aircraft.","Error":error});
    }
}

    // Start of Selection
exports.getAircraft = async (req, res) => {
        const aircraftID = req.params.id;
        try {
            const result = await aircraftModel.getAircraftQuery(aircraftID);
            res.send({ "message": "Aircraft retrieved successfully.", "result": result });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "message": "Failed to get aircraft." });
        }
    }

exports.getallaircraft = async (req, res) => {
    try {
        const result = await aircraftModel.getAllAircraftQuery();
        res.send({ "message": "All aircraft retrieved successfully.", "results": result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to get all aircraft." });
    }
}