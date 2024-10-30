const db = require('../database');

 // Start of Selection
const routeModel = require('../models/routeModel');

exports.addRoute = async (req, res) => {
    const { Depature_Airport, Arival_Airport } = req.body;
    try {
        const insertId = await routeModel.addRoute(Depature_Airport, Arival_Airport);
        res.send({ "message": "Route added successfully.", "result": insertId[0][0].Route_ID});
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to add route." });
    }
};

exports.getRoute = async (req, res) => {
    const routeID = req.params.id;
    try {
        const route = await routeModel.getRoute(routeID);
        res.send({ "message": "Route retrieved successfully.", "result": route });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to get route." });
    }
};

exports.getAllRoute = async (req,res) => {
    try {
        const routes = await routeModel.getAllRoute();
        res.send({ "message": "All routes retrieved successfully.", "results": routes });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to get all routes." });
    }
}