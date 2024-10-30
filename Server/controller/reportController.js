const reportModel = require('../models/reportModel');


exports.getPassengersByAge = async (req, res) => {
    console.log(req.params.flight_no);
    const flight_no = req.params.flight_no;
    try {
        const result = await reportModel.getPassengersByAgeForFlight(flight_no);
        console.log(result);
        return res.json({"status":200, "below18":result.below18,"aboveOrEqual18":result.aboveOrEqual18});
        
    } catch (error) {
        console.error(error);
        return res.json({"status":500, "message": "Failed to retrieve passengers by age." });
    }
};

exports.getPassengerCountByDestination = async (req, res) => {
    console.log(req.body);
    const { startDate, endDate, destination } = req.body;
    if (!startDate || !endDate || !destination) {
        return res.status(400).send({ "message": "startDate, endDate, and destination are required." });
    }
    try {
        const count = await reportModel.getPassengerCountByDestination(startDate, endDate, destination);
        console.log(count);
        return res.json({"status":200, "message": "Passenger count retrieved successfully.", 
            "PassengerCount": count });
        
    } catch (error) {
        console.error(error);
        return res.json({"status":500,"message": "Failed to retrieve passenger count by destination." });
    }
};

exports.getBookingsByCategory = async (req, res) => {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
        return res.status(400).send({ "message": "startDate and endDate are required." });
    }
    try {
        const bookings = await reportModel.getBookingsByPassengerCategory(startDate, endDate);
        return res.json({
            "status": 200,
            "message": "Bookings retrieved successfully",
            "Bookings": bookings
        });
    } catch (error) {
        console.error(error);
        return res.json({
            "status": 500,
            "message": "Failed to retrieve bookings by category."
        });
    }
};

exports.getPastFlights = async (req, res) => {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
        return res.status(400).send({ "message": "origin and destination are required." });
    }
    try {
        const flights = await reportModel.getPastFlightsData(origin, destination);
        return res.json({
            "status": 200,
            "message": "Past flights data retrieved successfully",
            "Flights": flights
        });
    } catch (error) {
        console.error(error);
        return res.json({
            "status": 500,
            "message": "Failed to retrieve past flights data."
        });
    }
};

exports.getRevenueByAircraft = async (req, res) => {
    try {
        const revenue = await reportModel.getRevenueByAircraft();
        return res.json({
            "status": 200,
            "message": "Revenue by aircraft type retrieved successfully",
            "Revenue": revenue
        });
    } catch (error) {
        console.error(error);
        return res.json({
            "status": 500,
            "message": "Failed to retrieve revenue by aircraft type."
        });
    }
};


