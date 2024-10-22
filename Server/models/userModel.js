const db = require('../database');

    // Start Generation Here
    exports.getDetails = (Username) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM User WHERE User_Name = ?;';
            db.query(query, [Username], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    exports.addDetails = (User_Name, First_name, Last_name, Email, DOB, Age, Gender, Password, Role) => {
        return new Promise((resolve, reject) => {
            const query = 'CALL addUser(?,?,?,?,?,?,?,?,?);';
            db.query(query, [User_Name, First_name, Last_name, Email, DOB, Age, Gender, Password, Role], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

