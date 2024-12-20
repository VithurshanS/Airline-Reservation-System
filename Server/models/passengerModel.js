const db = require('../database');

    // Start Generation Here
   /* exports.addPassenger = (Passenger_Name, Passport_Number, DOB, Gender) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB,AGE, Gender) VALUES (UUID(),?,?,?,calculateAge("${DOB}"),?);`;
            db.query(query, [Passenger_Name, Passport_Number, DOB, Gender], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    };*/

    exports.addPassenger = (Passenger_Name, Passport_Number, DOB, Gender) => {
        return new Promise((resolve, reject) => {
            const query = `CALL AddPassenger(?, ?, ?, ?);`;
            db.query(query, [Passenger_Name, Passport_Number, DOB, Gender], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const passengerID = results[0][0].ID;
                    resolve(passengerID);
                }
            });
        });
    };
    
    
    exports.getPassengerByPassportNumber = (Passport_Number) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Passenger WHERE Passport_Number = ?;`;
            db.query(query, [Passport_Number], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    };
