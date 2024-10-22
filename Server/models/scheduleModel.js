const db = require('../database')

    // Start Generation Here
    exports.addSchedule = (Route_ID, Plane_ID, Depature_Time, Arival_Time, Economy_Fare, Business_Fare, Platinum_Fare) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Schedule (Schedule_ID, Route_ID, Plane_ID, Departure_Time, Arrival_Time, Economy_Fare, Business_Fare, Platinum_Fare) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?);`;
            db.query(query, [Route_ID, Plane_ID, Depature_Time, Arival_Time, Economy_Fare, Business_Fare, Platinum_Fare], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    };

    exports.getSchedule = () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Schedule;`;
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };
