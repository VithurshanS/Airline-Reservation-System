import React from 'react';
import './Passengerdetails.css';

const PassengerPage = () => {
    const passengers = [
        { passenger_id: 1, passenger_name: 'Alice Johnson', passport_number: 'P9876543', DOB: '1990-06-15', gender: 'Female' },
        { passenger_id: 2, passenger_name: 'Robert Smith', passport_number: 'P1234567', DOB: '1985-12-20', gender: 'Male' },
        { passenger_id: 3, passenger_name: 'Laura Wilson', passport_number: 'P2345678', DOB: '2000-03-18', gender: 'Female' },
        { passenger_id: 4, passenger_name: 'Michael Brown', passport_number: 'P3456789', DOB: '1998-07-23', gender: 'Male' },
        { passenger_id: 5, passenger_name: 'Sara Thompson', passport_number: 'P4567890', DOB: '2005-10-11', gender: 'Female' },
        // Add more hardcoded passenger details as needed
    ];

    return (
        <div className="page-background">
            <div className="passenger-page-container">
                <h2>Passenger Details</h2>
                <table className="passenger-table">
                    <thead>
                        <tr>
                            <th>Passenger ID</th>
                            <th>Passenger Name</th>
                            <th>Passport Number</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger) => (
                            <tr key={passenger.passenger_id}>
                                <td>{passenger.passenger_id}</td>
                                <td>{passenger.passenger_name}</td>
                                <td>{passenger.passport_number}</td>
                                <td>{passenger.DOB}</td>
                                <td>{passenger.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PassengerPage;
