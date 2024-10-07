const db = require('../database');

exports.addDetails = async (req,res)=>{
    const {User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role} = req.body;
    const insertUser = `INSERT INTO User (User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role) VALUES (UUID(),?,?,?,?,?,?,?,?,?);`;
    db.query(insertUser,[User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role],(error,result)=>{
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
            //const mes = result[2][0].message;
            let mes;
            try{
                mes = result[2][0].message;
            }catch(err){
                mes = result[1][0].message;
            }
            if(mes === 201){
                res.send([result[0],mes]);
            }else{
                res.send({mes});
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