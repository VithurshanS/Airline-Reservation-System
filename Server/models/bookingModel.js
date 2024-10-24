const db = require('../database');

    // Start Generation Here
    exports.insertBooking = (Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO booking (Booking_ID, Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status) VALUES (UUID(),?,?,?,?,?);`;
            db.query(query, [Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    };

    exports.getBooking = () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM booking;`;
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    //get all bookings made by users
