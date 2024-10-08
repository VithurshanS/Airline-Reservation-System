const db = require('../database');
const bcrypt = require('bcrypt');

exports.addDetails = async (req,res)=>{
    const {User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role} = req.body;
    const insertUser = `INSERT INTO User (User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role) VALUES (UUID(),?,?,?,?,?,?,?,?,?);`;
    const encryptedPassword = await bcrypt.hash(Password, 10);
    db.query(insertUser,[User_Name,First_name,Last_name,Email,DOB,Age,Gender,encryptedPassword,Role],(error,result)=>{
        if(error){
            console.log(error);
            res.send("error")
        }else{
            res.send(["success"]);
            console.log(result);
        }
    });

}

exports.getDetails = async (req,res)=>{
    const {User_Name,Password} = req.body;
    const getUser = `call handleLogin(?,?,@mes);SELECT @mes AS message;`;
    
    db.query(getUser,[User_Name,Password],(error,result)=>{
        if(error){
            console.log(error);
            res.send("error");
        }else{

            let mes;
            try{
                mes = result[2][0].message;
            }catch(err){
                mes = result[1][0].message;
            }
            if(mes === 201){
                res.send({"message":201,"data":result[0][0]});
            }else{
                res.send({"message":mes,"data":null});
            }
            
        }
    });

}

/*{
    "User_Name":"vithurshan",
    "First_name":"siva",
    "Last_name":"nathan",
    "Email":"",
    "DOB":null,
    "Age":21,
    "Gender":"Male",
    "Password":"vithu",
    "Role":"Admin"
}*/

/*{
    "User_Name":"vithurshan",
    "Password":"vithu"
}*/