const db = require('../database');

 // Start Generation Here
 exports.addRoute = (Depature_Airport, Arival_Airport) => {
    return new Promise((resolve, reject) => {
        const query = `CALL handleRouteadd(?, ?);`;
        db.query(query, [Depature_Airport, Arival_Airport], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
 };

 exports.getRoute = (Route_ID) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM route WHERE Route_ID = ?;`;
        db.query(query, [Route_ID], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
 };

 //consider the getroute function is return null value if it cant get route
