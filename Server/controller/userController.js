const db = require('../database');
const bcrypt = require('bcrypt');

exports.addDetails = async (req,res)=>{
    const bb = req.body;
    const {User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role} = req.body;
    const insertUser = `INSERT INTO User (User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role) VALUES (UUID(),?,?,?,?,?,?,?,?,?);`;
    const hash = await bcrypt.hash(Password,10);
    console.log(hash);
    db.query(insertUser,[User_Name,First_name,Last_name,Email,DOB,Age,Gender,hash,Role],(error,result)=>{
        if(error){
            console.log(error);
            res.send("error")
        }else{
            res.send("success");
            console.log(result);
        }
    });

}

/*exports.addDetails = async (req,res)=>{
    const bb = req.body;
    bb.list.forEach(async element => {
        const {User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role} = element;
        const insertUser = `INSERT INTO User (User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role) VALUES (UUID(),?,?,?,?,?,?,?,?,?);`;
        const hash = await bcrypt.hash(Password,10);
        console.log(hash);
        db.query(insertUser,[User_Name,First_name,Last_name,Email,DOB,Age,Gender,hash,Role],(error,result)=>{
            if(error){
                console.log(error);
                //res.send("error")
            }else{
                //res.send("success");
                console.log(result);
            }
        });
        
    });
    res.send("success");
    

}*/

/*exports.getDetails = async (req,res)=>{
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

}*/

/*exports.getDetails = async (req, res) => {
    const { Username, Password } = req.body;
    const getPassword = `select * from User where User_Name = ?`
}*/

exports.getDetails = async (req,res)=>{
    const {Username,Password} = await req.body;
    const askUser = 'SELECT * FROM User WHERE User_Name = ?;'

    db.query(askUser,[Username], async (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            if(result.length === 0){
                res.send({"message":301}) //invalid user
            }else{
                console.log(result[0].Password);
                const is_matched = await bcrypt.compare(result[0].Password,Password);
                if(is_matched){
                    res.send({"message":201,"user":result[0]})
                }else{
                    res.send({"message":401});
                }
            }
        }
    })
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