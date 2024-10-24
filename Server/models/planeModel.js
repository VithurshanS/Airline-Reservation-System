const db = require('../database');


 // Start Generation Here
exports.addPlane = (Aircraft_ID, Plane_name) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Plane (Aircraft_ID, Plane_name) VALUES (?, ?);`;
        db.query(query, [Aircraft_ID, Plane_name], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

exports.getPlane = (Aircraft_ID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Plane WHERE Aircraft_ID = (?);`;
        db.query(query, [Aircraft_ID], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};
