import { useState } from 'react';
import './Booking.css';

const BookingPage = () => {
    const [bookings] = useState([
        { booking_id: 1, passportNumber: 'P1234567', userName: 'John Doe', flightName: 'B737', seatNumber: '12A', seatClass: 'Economy', finalPrice: 200, bookingStatus: 'Confirmed' },
        { booking_id: 2, passportNumber: 'P7654321', userName: 'Jane Smith', flightName: 'A380', seatNumber: '1C', seatClass: 'Business', finalPrice: 500, bookingStatus: 'Pending' },
        { booking_id: 3, passportNumber: 'P1122334', userName: 'Mike Johnson', flightName: '757', seatNumber: '3B', seatClass: 'Platinum', finalPrice: 800, bookingStatus: 'Cancelled' },
        { booking_id: 4, passportNumber: 'P9988776', userName: 'Emily Davis', flightName: 'B737', seatNumber: '7D', seatClass: 'Economy', finalPrice: 250, bookingStatus: 'Confirmed' },
        { booking_id: 5, passportNumber: 'P5544332', userName: 'David Wilson', flightName: 'A320', seatNumber: '5A', seatClass: 'Business', finalPrice: 450, bookingStatus: 'Cancelled' },
        { booking_id: 6, passportNumber: 'P6677889', userName: 'Olivia Brown', flightName: '787', seatNumber: '10C', seatClass: 'Economy', finalPrice: 220, bookingStatus: 'Confirmed' },
        { booking_id: 7, passportNumber: 'P3344556', userName: 'Chris Taylor', flightName: '777', seatNumber: '3E', seatClass: 'First Class', finalPrice: 1000, bookingStatus: 'Pending' },
        { booking_id: 8, passportNumber: 'P2233445', userName: 'Sophia Martin', flightName: 'A350', seatNumber: '8F', seatClass: 'Platinum', finalPrice: 900, bookingStatus: 'Confirmed' },
        { booking_id: 9, passportNumber: 'P8877665', userName: 'Liam Jackson', flightName: 'B747', seatNumber: '12B', seatClass: 'Economy', finalPrice: 300, bookingStatus: 'Pending' },
        { booking_id: 10, passportNumber: 'P7788994', userName: 'Isabella Garcia', flightName: '737 MAX', seatNumber: '6A', seatClass: 'Economy', finalPrice: 280, bookingStatus: 'Confirmed' },
        { booking_id: 11, passportNumber: 'P1122113', userName: 'William Moore', flightName: 'A321', seatNumber: '2B', seatClass: 'Business', finalPrice: 550, bookingStatus: 'Confirmed' },
        { booking_id: 12, passportNumber: 'P4455663', userName: 'Ava Anderson', flightName: '757', seatNumber: '11D', seatClass: 'Economy', finalPrice: 190, bookingStatus: 'Cancelled' },
        { booking_id: 13, passportNumber: 'P9988665', userName: 'Lucas White', flightName: 'B777', seatNumber: '1F', seatClass: 'First Class', finalPrice: 1200, bookingStatus: 'Confirmed' },
        { booking_id: 14, passportNumber: 'P6677992', userName: 'Charlotte Harris', flightName: 'A340', seatNumber: '9A', seatClass: 'Platinum', finalPrice: 850, bookingStatus: 'Pending' },
        { booking_id: 15, passportNumber: 'P3344221', userName: 'James Thompson', flightName: '787', seatNumber: '14C', seatClass: 'Economy', finalPrice: 240, bookingStatus: 'Confirmed' }
    ]);

    return (
        <div className="page-background">
            <div className="booking-container">
                <h2>Booking Management</h2>
                
                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Passport Number</th>
                            <th>User Name</th>
                            <th>Flight Name</th>
                            <th>Seat Number</th>
                            <th>Seat Class</th>
                            <th>Final Price</th>
                            <th>Booking Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.booking_id} className={`status-${booking.bookingStatus.toLowerCase()}`}>
                                <td>{booking.booking_id}</td>
                                <td>{booking.passportNumber}</td>
                                <td>{booking.userName}</td>
                                <td>{booking.flightName}</td>
                                <td>{booking.seatNumber}</td>
                                <td>{booking.seatClass}</td>
                                <td>${booking.finalPrice}</td>
                                <td>{booking.bookingStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingPage;
