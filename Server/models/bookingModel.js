const db = require('../database');

    // Start Generation Here
    exports.insertBooking = (Passenger_ID, User_ID, Seat_ID) => {
        return new Promise((resolve, reject) => {
            const query = `call handleBooking(?,?,?);`
            //const query = `INSERT INTO booking (Booking_ID, Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status) VALUES (UUID(),?,?,?,?,?);`;
            db.query(query, [Passenger_ID, User_ID, Seat_ID], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    };

    exports.bookSeat = (seat)=>{
        return new Promise((resolve, reject) => {
            const query = `call bookseat(?);`;
            db.query(query, [seat], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

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
