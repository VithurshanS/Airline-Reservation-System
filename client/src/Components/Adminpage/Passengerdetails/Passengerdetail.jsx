import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Passengerdetails.css';

const PassengerPage = () => {
    const [passengers, setPassengers] = useState([]);

    const fetchPassengers = async () => {
        try {
            const response = await axios.get('http://localhost:3067/getall');
            
            if (response.data.message === 'got that' && response.data.result) {
                const formattedPassengers = response.data.result.map((passenger) => ({
                    passenger_id: passenger.Passenger_ID,
                    passenger_name: passenger.Passenger_Name,
                    passport_number: passenger.Passport_Number,
                    DOB: passenger.DOB,
                    gender: passenger.Gender
                }));
                setPassengers(formattedPassengers);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching passengers:', error);
        }
    };

    useEffect(() => {
        fetchPassengers();
    }, []);

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
