const db = require('../database');

exports.addAircraftQ = (company,AircraftType,totalseats,ESSN,BSSN,PSSN)=>{
    return new Promise((resolve,reject)=>{
        const insertAircraft = `call handleAircraft(?,?,?,?,?,?);`;
        db.query(insertAircraft,[company,AircraftType,totalseats,ESSN,BSSN,PSSN],(error,result)=>{
            if(error){
                reject(error);
            } else {
                resolve(result[0][0].message);
            }
        })

    })


}

exports.getAircraftQuery = (aircraftID) =>{
    return new Promise((resolve, reject) => {
        const getAircraft = `SELECT * FROM Aircraft WHERE Aircraft_ID = (?);`;
        db.query(getAircraft, [aircraftID], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}