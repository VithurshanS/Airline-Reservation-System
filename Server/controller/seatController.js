const db = require('../database');


exports.addSeat = async (req,res)=>{
    const {Schedule_ID,Seat_number,Seat_class,Seat_status} = req.body;
    const insertSeat = `INSERT INTO seat (Seat_ID, Schedule_ID, Seat_Number, Seat_class,Seat_status) VALUES (UUID(),?,?,?,?);`;
    db.query(insertSeat,[Schedule_ID,Seat_number,Seat_class,Seat_status],(error,result)=>{
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

exports.getavailableSeat = async (req,res)=>{
    const Schedule_ID = req.params.scheduleid;
    const getquery = `SELECT Seat_ID,Seat_number FROM seat WHERE Schedule_ID =? and Seat_status = "available";`;
    db.query(getquery,[Schedule_ID],(error,result)=>{
        if(error){
            res.send({"message":"error occured when get seat for schedule"});
        } else{
            res.send({"message":"Successfully get","results":result});
        }
    });
}
exports.getbookedSeat = async (req,res)=>{
    const Schedule_ID = req.params.scheduleid;
    const getquery = `SELECT Seat_ID,Seat_number FROM seat WHERE Schedule_ID =? and Seat_status = "booked";`;
    db.query(getquery,[Schedule_ID],(error,result)=>{
        if(error){
            res.send({"message":"error occured when get seat for schedule"});
        } else{
            res.send({"message":"Successfully get","results":result});
        }
    });
}
exports.getselectedSeat = async (req,res)=>{
    const Schedule_ID = req.params.scheduleid;
    const getquery = `SELECT Seat_ID,Seat_number FROM seat WHERE Schedule_ID =? and Seat_status = "selected";`;
    db.query(getquery,[Schedule_ID],(error,result)=>{
        if(error){
            res.send({"message":"error occured when get seat for schedule"});
        } else{
            res.send({"message":"Successfully get","results":result});
        }
    });
}

exports.bookSeats = async (req, res) => {
    const { selectedSeats } = req.body;

    const updateSeatQuery = `UPDATE seat SET Seat_status = 'booked' WHERE Seat_ID IN (?)`;
    
    db.query(updateSeatQuery, [selectedSeats], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send({ "message": "Failed to book seats." });
        } else {
            res.send({ "message": "Seats booked successfully.", "result": result });
        }
    });
};
