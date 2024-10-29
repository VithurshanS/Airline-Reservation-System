const db = require('../database');

exports.getPassengersByAgeForFlight = (flight_no) => {
    return new Promise((resolve, reject) => {
        const query = `CALL getPassengersByAgeForFlight(?);`;
        db.query(query, [flight_no], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    below18: results[0],
                    aboveOrEqual18: results[1]
                });
            }
        });
    });
};

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