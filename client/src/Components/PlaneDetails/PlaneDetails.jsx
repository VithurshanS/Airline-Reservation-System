import React from 'react';
import './PlaneDetails.css';

const PlaneDetails = () => {
    const planes = [
        { id: 1, aircraftName: 'Boeing 737', planeName: 'Sky Hawk' },
        { id: 2, aircraftName: 'Airbus A380', planeName: 'Eagle One' },
        { id: 3, aircraftName: 'Boeing 757', planeName: 'Falcon Flyer' },
        { id: 4, aircraftName: 'Boeing 737', planeName: 'Blue Bird' },
        { id: 5, aircraftName: 'Airbus A320', planeName: 'Jet Stream' },
        // Add more hardcoded plane details here as needed
    ];

    return (
        <div className="page-background">
            <div className="plane-details-container">
                <h2>Plane Details</h2>
                <table className="plane-table">
                    <thead>
                        <tr>
                            <th>Plane ID</th>
                            <th>Aircraft Name</th>
                            <th>Plane Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planes.map(plane => (
                            <tr key={plane.id}>
                                <td>{plane.id}</td>
                                <td>{plane.aircraftName}</td>
                                <td>{plane.planeName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlaneDetails;
