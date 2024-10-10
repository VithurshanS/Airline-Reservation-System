const db = require('../database');

exports.addPlane = async (req,res) =>{
    const {Aircraft_ID,Plane_name,Total_seats,ESSN,BSSN,PSSN} = req.body;
    const insertPlane = `INSERT INTO Plane (Aircraft_ID, Plane_name, Total_seats,Economy_seat_start_no , Business_seat_start_no, Platinum_seat_start_no) VALUES (?,?,?,?,?,?);`;
    db.query(insertPlane,[Aircraft_ID,Plane_name,Total_seats,ESSN,BSSN,PSSN],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add plane."});
        } else {
            res.send({"message":"Plane added successfully.","result":result});
        }
    });


}

exports.getPlane = async (req, res) =>{
    const planeID = req.params.id;
    const getPlane = `SELECT * FROM Plane WHERE Aircraft_ID =?;`;
    db.query(getPlane,[planeID],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to get plane."});
        } else {
            res.send({"message":"Plane retrieved successfully.","result":result[0] === undefined ? "empty" : result[0]});
        }
    });
};