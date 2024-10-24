const db = require('../database');

    // Start Generation Here
    exports.addSeat = (Schedule_ID, Seat_number, Seat_class, Seat_status) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO seat (Seat_ID, Schedule_ID, Seat_Number, Seat_class, Seat_status) VALUES (UUID(), ?, ?, ?, ?);`;
            db.query(query, [Schedule_ID, Seat_number, Seat_class, Seat_status], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    exports.getSeat = (Schedule_ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM seat where Schedule_ID = ?;`;
            db.query(query,[Schedule_ID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    exports.getavailableSeat = (Schedule_ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT Seat_ID, Seat_number FROM seat WHERE Schedule_ID = ? AND Seat_status = "available";`;
            db.query(query, [Schedule_ID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    exports.getbookedSeat = (Schedule_ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT Seat_ID, Seat_number FROM seat WHERE Schedule_ID = ? AND Seat_status = "booked";`;
            db.query(query, [Schedule_ID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    exports.getselectedSeat = (Schedule_ID) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT Seat_ID, Seat_number FROM seat WHERE Schedule_ID = ? AND Seat_status = "selected";`;
            db.query(query, [Schedule_ID], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    };

    exports.bookSeats = (selectedSeats) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE seat SET Seat_status = 'booked' WHERE Seat_ID IN (?);`;
            db.query(query, [selectedSeats], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };

    //create a procedure to book a seat

