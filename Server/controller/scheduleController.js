const db = require('../database')

exports.addSchedule = async (req,res) =>{
    const {Route_ID,Plane_ID,Depature_Time,Arival_Time,Economy_Fare,Business_Fare,Platinum_Fare,Status} = req.body;
    const insertquery = `insert into Schedule (Schedule_ID,Route_ID,Plane_ID,Depature_Time,Arival_Time,Economy_Fare,Business_Fare,Platinum_Fare,Status) values (UUID(),?,?,?,?,?,?,?,?);`;
    db.query(insertquery,[Route_ID,Plane_ID,Depature_Time,Arival_Time,Economy_Fare,Business_Fare,Platinum_Fare,Status],(error,result)=>{
        if(error){
            res.send({"message":"error when insert","error":error});
        }else{
            res.send({"message":"insertion successfull"})
        }
    })
    
}

exports.getSchedule = async (req,res)=>{
    const getquery = `select * from schedule;`;
    db.query(getquery,(error,result)=>{
        if(error){
            res.send({"message":"error occured when get schedule"});
        }else{
            res.send({"message":"successfully get","results":result});
        }
    })

}