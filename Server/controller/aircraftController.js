const db = require('../database');

exports.addAircraft = async (req,res)=>{
    const {company,AircraftType,totalseats,ESSN,BSSN,PSSN} = req.body;
    const insertAircraft = `call handleAircraft(?,?,?,?,?,?);`;
    db.query(insertAircraft,[company,AircraftType,totalseats,ESSN,BSSN,PSSN],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add aircraft."});
        } else {
            res.send({"message":result[0][0].message});
        }
    })
}

exports.getAircraft = async (req,res)=>{
    const aircraftID = req.params.id;
    const getAircrafts = `SELECT * FROM Aircraft WHERE Aircraft_ID =?;`;
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