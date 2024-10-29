const db = require('../database');

exports.insertAirport = (airportCode, airportName, locationID) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Airport (Airport_Code, Airport_Name, Location_ID) VALUES (?, ?, ?);`;
        db.query(query, [airportCode, airportName, locationID], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getAirport = (airportID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Airport WHERE Airport_ID = ?;`;
        db.query(query, [airportID], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
};

exports.getAllAirports = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Airport;`;
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
