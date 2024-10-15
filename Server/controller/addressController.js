const db = require('../database');


const handleInsertAddress = (Addresslist, parentAddressID, index, callback) => {
    if (index < 0) {
        return callback(null, parentAddressID);
    }
    
    const address = Addresslist[index];
    
    insert(address, parentAddressID, (err, currentID) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        handleInsertAddress(Addresslist, currentID, index - 1, callback);
    });
};



const insert = (address, parentAddressID, callback) => {
    const quer = `call addAddress(?,?);`;
    db.query(quer, [parentAddressID,address], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        
        return callback(null, result[0][0].output_address);
    });
    /*const checkAddress = `SELECT Location_ID FROM Location WHERE Address = ?;`;
    
    db.query(checkAddress, [address], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        
        if (result.length > 0) {
            return callback(null, result[0].Location_ID);
        }
        
        const insertquery = `INSERT INTO Location (Parent_Location_ID, Address) VALUES (?, ?);`;
        
        db.query(insertquery, [parentAddressID, address], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            }

            return callback(null, result.insertId);
        });
    });*/
};

exports.addressadder = (Addresslist) => {
    return new Promise((resolve, reject) => {
        let parentoffinal = null;

        handleInsertAddress(Addresslist, parentoffinal, Addresslist.length - 1, (err, finaladdress) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(finaladdress);
            }
        });
    });
};



exports.addLocation =  async (req, res) => {
    const { Addresslist } = req.body;

    let parentoffinal = null;

    try{
        handleInsertAddress(Addresslist, parentoffinal, Addresslist.length - 1, (err, finaladdress) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ "message": "Failed to add location." });
            }
            res.send({ "message": "Location added successfully.", "result": finaladdress });
        });

    }catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "Failed to add location." });
    }
    
    
}

exports.getLocation = async (req, res) => {
    const locationID = req.params.id;
    const quer = `call getLocation(?);`;
    db.query(quer,[locationID],(err, result) => {
        if(err){
            console.log(err);
            return res.status(500).send({"message":"Failed to get location."});
        }
        res.send({"message":"Successfully get location.","results":result[0]});
    });
    /*const getFullLocation = (locationID, locationList = [], callback) => {
        const query = `SELECT Location_ID, Parent_Location_ID, Address FROM Location WHERE Location_ID = ?;`;

        db.query(query, [locationID], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            }

            if (result.length === 0) {
                return callback(new Error('Location not found.'));
            }

            const location = result[0];
            locationList.push(location.Address); 

            if (location.Parent_Location_ID) {
                getFullLocation(location.Parent_Location_ID, locationList, callback);
            } else {
                return callback(null, locationList);
            }
        });
    };

    getFullLocation(locationID, [], (err, fullLocation) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ "message": "Failed to retrieve location." });
        }

        res.send({ "fullLocation": fullLocation });
    });*/
}