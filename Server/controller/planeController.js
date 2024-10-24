const db = require('../database');
const planeModel = require('../models/planeModel');

 // Start of Selection
exports.addPlane = async (req, res) => {
    const { Aircraft_ID, Plane_name } = req.body;
    try {
        const insertId = await planeModel.addPlane(Aircraft_ID, Plane_name);
        res.send({ "message": "Plane added successfully.", "result": insertId });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to add plane." });
    }
};

exports.getPlane = async (req, res) => {
    const planeID = req.params.id;
    try {
        const plane = await planeModel.getPlane(planeID);
        res.send({ "message": "Plane retrieved successfully.", "result": plane || "empty" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to get plane." });
    }
};