const db = require('../database');


exports.addPassengerDetails = async (req, res) => {
    const { Passenger_Name, Passport_Number, DOB, Age, Username, Password } = req.body;
    const checkQuery = 'SELECT COUNT(*) AS cou FROM passenger WHERE Username = ?;';
    const insertQuery = 'INSERT INTO Passenger (Passenger_Name, Passport_Number, DOB, Age, Username, Password) VALUES (?,?,?,?,?,?);';

    db.query(checkQuery, [Username], (err, result) => {
        if (err) {
            console.error("Error checking username:", err);
            return res.status(500).send("Server error");
        }

        const userExists = result[0].cou > 0;

        if (!userExists) {
            db.query(insertQuery, [Passenger_Name, Passport_Number, DOB, Age, Username, Password], (err, result) => {
                if (err) {
                    console.error("Error inserting passenger details:", err);
                    return res.status(500).send("Server error");
                }
                res.send("1");
            });
        } else {
            res.send("0");
        }
    });
};

exports.loginPassenger = async (req,res)=>{
    const {Username,Password} = req.body;
    const askUser = 'select * from passenger;'
    db.query(askUser,(err,result)=>{ [{},{},{}]
        if(err){
            console.log(err);
        }else{
            if(result.length < 1){
                const checkUser = 'select * from passenger where Username = ?;'
                db.query(checkUser,[Username],(err1,results1)=>{
                    if(err1){
                        console.log(err1);
                    }else{
                        if(results1.length >0){
                            res.send(["invalid password"]);
                        }else{
                            res.send(["no such user check your username"])
                        }
                    }
                })
            }else{
                res.send(result);
                console.log("data sent successfully");
                console.log(result);
            }
        }
    })
}
