const db = require('../database');

exports.addAircraft = async (req,res)=>{
    const {AircraftType,Fuel_capacity} = req.body;
    const insertAircraft = `INSERT INTO Aircraft_type (AircraftType, Fuel_Capacity) VALUES (?,?);`;
    db.query(insertAircraft,[AircraftType,Fuel_capacity],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add aircraft."});
        } else {
            res.send({"message":"Aircraft added successfully.","result":result});
        }
    })
}

exports.getAircraft = async (req,res)=>{
    const aircraftID = req.params.id;
    const getAircrafts = `SELECT * FROM Aircraft_type WHERE Aircraft_ID =?;`;
    db.query(getAircrafts,[aircraftID],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to get aircraft."});
        } else {
            res.send({"message":"Aircraft retrieved successfully.","result":result});
        }
    });

 
}

/*{
  "AircraftType":"KingFisher323",
  "Fuel_capacity":20000
}*/