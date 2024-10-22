const db = require('../database');

 // Start of Selection
const routeModel = require('../models/routeModel');

exports.addRoute = async (req, res) => {
    const { Depature_Airport, Arival_Airport } = req.body;
    try {
        const insertId = await routeModel.addRoute(Depature_Airport, Arival_Airport);
        res.send({ "message": "Route added successfully.", "result": insertId });
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