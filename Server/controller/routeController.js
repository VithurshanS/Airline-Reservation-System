const db = require('../database');

exports.addRoute = async (req,res) =>{
    const {Depature_Airport,Arival_Airport} = req.body;
    const insertRoute = `call handleRouteadd('${Depature_Airport}', '${Arival_Airport}');`;
    db.query(insertRoute,(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to add route."});
        } else {
            res.send({"message":"Route added successfully.","result":result});
        }
    });
}