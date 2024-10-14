const db = require('../database');
const bcrypt = require('bcrypt');

exports.getDetails = async (req, res) => {
    const { Username, Password } = await req.body;

    if (!Username || !Password) {
        return res.status(400).send({ message: "Username and password are required." });
    }
    const askUser = 'SELECT * FROM User WHERE User_Name = ?;';
    db.query(askUser, [Username], async (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send({ message: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(404).send({ message: 301 });
        }
        const user = result[0];
        const is_matched = await bcrypt.compare(Password, user.Password);
        if (is_matched) {
            const { Password, ...userDetails } = user;
            res.send({ message: 201, user: userDetails });
        } else {
            res.status(401).send({ message: 401 });
        }
    });
};

exports.addDetails = async (req, res) => {
    const { User_Name, First_name, Last_name, Email, DOB, Age, Gender, Password, Role } = req.body;

    // Input validation
    if (!User_Name || !First_name || !Last_name || !Email || !DOB || !Age || !Gender || !Password) {
        return res.status(400).send({ message: "All fields are required." });
    }

    const insertUser = `CALL addUser(?,?,?,?,?,?,?,?,?);`;

    try {
        const hash = await bcrypt.hash(Password, 10);

        db.query(insertUser, [User_Name, First_name, Last_name, Email, DOB, Age, Gender, hash, Role], (error, result) => {
            if (error) {
                console.error('Database Error:', error);
                return res.status(500).send({ message: "Failed to add user." });
            }

            res.send({ message: "success" });
            console.log(result);
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send({ message: "Internal server error" });
    }
};


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

/*exports.getDetails = async (req,res)=>{
    const {Username,Password} = req.body;
    const askUser = 'SELECT * FROM User WHERE User_Name = ?;'

    db.query(askUser,[Username], async (err,result)=>{
        if(err){
            console.log(err);
        }else{
            //console.log(result);
            if(result.length === 0){
                res.send({"message":301}) //invalid user
            }else{
                console.log(result[0]);
                const is_matched = await bcrypt.compare(Password,result[0].Password);
                if(is_matched){
                    res.send({"message":201,"user":result[0]})
                }else{
                    res.send({"message":401});
                }
            }
        }
    })
}*/

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