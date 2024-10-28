const db = require('../database');

// 1. Get Passengers by Age for a Given Flight
exports.getPassengersByAgeForFlight = (flight_no) => {
    return new Promise((resolve, reject) => {
        const query = `CALL getPassengersByAgeForFlight(?);`;
        db.query(query, [flight_no], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // results[0] contains passengers below 18, results[1] contains passengers 18 and above
                resolve({
                    below18: results[0],
                    aboveOrEqual18: results[1]
                });
            }
        });
    });
};

// 2. Get Passenger Count by Destination Within a Date Range
exports.getPassengerCountByDestination = (startDate, endDate, destination) => {
    return new Promise((resolve, reject) => {
        const query = `CALL getPassengerCountByDestination(?, ?, ?);`;
        db.query(query, [startDate, endDate, destination], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0][0].PassengerCount);
            }
        });
    });
};

// 3. Get Bookings by Passenger Category Within a Date Range
exports.getBookingsByPassengerCategory = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        const query = `CALL getBookingsByPassengerCategory(?, ?);`;
        db.query(query, [startDate, endDate], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

// 4. Get Past Flights Data Between Origin and Destination
exports.getPastFlightsData = (origin, destination) => {
    return new Promise((resolve, reject) => {
        const query = `CALL getPastFlightsData(?, ?);`;
        db.query(query, [origin, destination], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};


exports.getRevenueByAircraft = () => {
    return new Promise((resolve, reject) => {
        const query = `CALL generateRevenueByAircraftReport();`;
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};