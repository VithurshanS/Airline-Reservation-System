const db = require('../database');
const { addressadder } = require('./addressController');



exports.addAirport = async (req,res)=>{
    const {Airport_Code,Airport_name,Location} = req.body;
    const insertAirport = `INSERT INTO Airport (Airport_Code,Airport_Name,Location_ID) VALUES (?,?,?);`;
    const addressID = await addressadder(Location);
    db.query(insertAirport,[Airport_Code,Airport_name,addressID],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add airport."});
        } else {
            res.send({"message":"Airport added successfully.","result":result});
        }
    });
}

exports.getAirport = async (req,res)=>{
    const getAirports = `SELECT * FROM Airport;`;
    db.query(getAirports,(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to get airports."});
        } else {
            res.send({"message":"Airports retrieved successfully.","result":result});
        }
    });
}