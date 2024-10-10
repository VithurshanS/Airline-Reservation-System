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

exports.getRoute = async (req, res) =>{
    const routeID = req.params.id;
    const getRoute = `SELECT * FROM route WHERE Route_ID =?;`;
    db.query(getRoute,[routeID],(error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send({"message":"Failed to get route."});
        } else {
            res.send({"message":"Route retrieved successfully.","result":result[0]});
        }
    });
}