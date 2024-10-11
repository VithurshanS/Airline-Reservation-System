const db = require('../database');


exports.addSeat = async (req,res)=>{
    const {Schedule_ID,Seat_number,Seat_class} = req.body;
    const primarykey = `${Schedule_ID}${Seat_number}`;
    const insertSeat = `INSERT INTO seat (Seat_ID, Schedule_ID, Seat_Number, Seat_Class) VALUES (?,?,?,?);`;
    db.query(insertSeat,[primarykey,Schedule_ID,Seat_number,Seat_class],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add seat."});
        } else {
            res.send({"message":"Seat added successfully.","result":result});
        }
    });

}

exports.getSeat = async (req,res)=>{
    const getquery = `SELECT * FROM seat;`;
    db.query(getquery,(error,result)=>{
        if(error){
            res.send({"message":"error occured when get seat"});
        } else{
            res.send({"message":"Successfully get","results":result});
        }
    });
}