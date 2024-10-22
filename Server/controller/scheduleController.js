const db = require('../database')


const scheduleModel = require('../models/scheduleModel');

exports.addSchedule = async (req, res) => {
    const { Route_ID, Plane_ID, Depature_Time, Arival_Time, Economy_Fare, Business_Fare, Platinum_Fare } = req.body;
    try {
        const insertId = await scheduleModel.addSchedule(Route_ID, Plane_ID, Depature_Time, Arival_Time, Economy_Fare, Business_Fare, Platinum_Fare);
        res.send({ "message": "Insertion successful.", "result": insertId });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to add schedule." });
    }
};

exports.getSchedule = async (req, res) => {
    try {
        const results = await scheduleModel.getSchedule();
        res.send({ "message": "Successfully retrieved schedules.", "results": results });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "Failed to get schedules." });
    }
};

//define a function that will be called when we need get particular schedule
