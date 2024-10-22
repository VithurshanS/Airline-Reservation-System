const db = require('../database');

exports.insertaddress = (parentAddressID,address) =>{
    return new Promise((resolve, reject) =>{
        const quer = `call addAddress(?,?);`;
        db.query(quer, [parentAddressID,address], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result[0][0].output_address);
            }
    
        });
        
    })
}

exports.getAddress = (locationID)=>{
    return new Promise((resolve, reject) =>{
        const queri = `call getLocation(?);`;
        db.query(queri, [locationID], (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    })
}