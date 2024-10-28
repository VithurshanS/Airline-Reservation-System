const reportModel = require('../models/reportModel');


// 1. Get Passengers by Age for a Given Flight
exports.getPassengersByAge = async (req, res) => {
    const flight_no = req.params.flight_no;
    try {
        const result = await reportModel.getPassengersByAgeForFlight(flight_no);
        res.send({ 
            "message": "Passengers retrieved successfully.", 
            "data": result 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "message": "Failed to retrieve passengers by age." });
    }
};

// 2. Get Passenger Count by Destination Within a Date Range
exports.getPassengerCountByDestination = async (req, res) => {
    const { startDate, endDate, destination } = req.body;
    if (!startDate || !endDate || !destination) {
        return res.status(400).send({ "message": "startDate, endDate, and destination are required." });
    }
    try {
        const count = await reportModel.getPassengerCountByDestination(startDate, endDate, destination);
        res.send({ 
            "message": "Passenger count retrieved successfully.", 
            "PassengerCount": count 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "message": "Failed to retrieve passenger count by destination." });
    }
};

// 3. Get Bookings by Passenger Category Within a Date Range
exports.getBookingsByCategory = async (req, res) => {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
        return res.status(400).send({ "message": "startDate and endDate are required." });
    }
    try {
        const bookings = await reportModel.getBookingsByPassengerCategory(startDate, endDate);
        res.send({ 
            "message": "Bookings by category retrieved successfully.", 
            "Bookings": bookings 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "message": "Failed to retrieve bookings by category." });
    }
};

// 4. Get Past Flights Data Between Origin and Destination
exports.getPastFlights = async (req, res) => {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
        return res.status(400).send({ "message": "origin and destination are required." });
    }
    try {
        const flights = await reportModel.getPastFlightsData(origin, destination);
        res.send({ 
            "message": "Past flights data retrieved successfully.", 
            "Flights": flights 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "message": "Failed to retrieve past flights data." });
    }
};

// 5. Get Revenue by Aircraft Type
exports.getRevenueByAircraft = async (req, res) => {
    try {
        const revenue = await reportModel.getRevenueByAircraft();
        res.send({
            "message": "Revenue by aircraft type retrieved successfully.",
            "Revenue": revenue
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ "message": "Failed to retrieve revenue by aircraft type." });
    }
};




