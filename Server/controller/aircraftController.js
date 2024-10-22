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

/*{
  "AircraftType":"KingFisher323",
  "Fuel_capacity":20000
}*/