import React, { useState } from 'react';
import './ScheduleEdit.css';

const ScheduleEdit = () => {
    const [schedules, setSchedules] = useState([
        { id: 1, flightNumber: 'BA123', origin: 'BIA', destination: 'BKK', departureTime: '10:00', arrivalTime: '13:00', airplane: 'Boeing 737' },
        { id: 2, flightNumber: 'BA456', origin: 'CGK', destination: 'SIN', departureTime: '15:00', arrivalTime: '18:00', airplane: 'Airbus A380' },
        { id: 3, flightNumber: 'BA789', origin: 'DEL', destination: 'DMK', departureTime: '08:00', arrivalTime: '11:30', airplane: 'Boeing 757' },
        { id: 4, flightNumber: 'BA101', origin: 'HRI', destination: 'MAA', departureTime: '14:00', arrivalTime: '16:30', airplane: 'Boeing 737' },
        { id: 5, flightNumber: 'BA202', origin: 'SIN', destination: 'DPS', departureTime: '09:30', arrivalTime: '12:30', airplane: 'Boeing 757' },
        { id: 6, flightNumber: 'BA303', origin: 'BOM', destination: 'CGK', departureTime: '20:00', arrivalTime: '23:00', airplane: 'Boeing 737' },
        { id: 7, flightNumber: 'BA404', origin: 'BIA', destination: 'HRI', departureTime: '06:30', arrivalTime: '08:00', airplane: 'Airbus A380' },
        { id: 8, flightNumber: 'BA505', origin: 'DEL', destination: 'BKK', departureTime: '11:45', arrivalTime: '15:15', airplane: 'Boeing 757' },
        { id: 9, flightNumber: 'BA606', origin: 'DMK', destination: 'SIN', departureTime: '13:00', arrivalTime: '16:00', airplane: 'Boeing 737' },
        { id: 10, flightNumber: 'BA707', origin: 'MAA', destination: 'BIA', departureTime: '07:15', arrivalTime: '10:45', airplane: 'Airbus A380' },
    ]);
    const [editedSchedule, setEditedSchedule] = useState(null);

    const handleEdit = (schedule) => {
        setEditedSchedule(schedule);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedSchedule({ ...editedSchedule, [name]: value });
    };

    const handleSave = () => {
        setSchedules(schedules.map(schedule => schedule.id === editedSchedule.id ? editedSchedule : schedule));
        setEditedSchedule(null);
    };

    const handleCancel = () => {
        setEditedSchedule(null);
    };

    return (
        <div className="page-background">
            <div className="schedule-edit-container">
                <h2>Flight Schedule Management</h2>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Schedule ID</th>
                            <th>Flight No.</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Airplane</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.id}>
                                <td>{schedule.id}</td>
                                <td>{schedule.flightNumber}</td>
                                <td>{schedule.origin}</td>
                                <td>{schedule.destination}</td>
                                <td>{schedule.departureTime}</td>
                                <td>{schedule.arrivalTime}</td>
                                <td>{schedule.airplane}</td>
                                <td>
                                    <button onClick={() => handleEdit(schedule)} className="edit-btn">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editedSchedule && (
                    <div className="edit-form">
                        <h3>Edit Flight Schedule</h3>
                        <label>
                            Schedule ID:
                            <input type="text" name="id" value={editedSchedule.id} onChange={handleInputChange} disabled />
                        </label>
                        <label>
                            Flight Number:
                            <input type="text" name="flightNumber" value={editedSchedule.flightNumber} onChange={handleInputChange} />
                        </label>
                        <label>
                            Origin:
                            <input type="text" name="origin" value={editedSchedule.origin} onChange={handleInputChange} />
                        </label>
                        <label>
                            Destination:
                            <input type="text" name="destination" value={editedSchedule.destination} onChange={handleInputChange} />
                        </label>
                        <label>
                            Departure Time:
                            <input type="time" name="departureTime" value={editedSchedule.departureTime} onChange={handleInputChange} />
                        </label>
                        <label>
                            Arrival Time:
                            <input type="time" name="arrivalTime" value={editedSchedule.arrivalTime} onChange={handleInputChange} />
                        </label>
                        <label>
                            Airplane:
                            <input type="text" name="airplane" value={editedSchedule.airplane} onChange={handleInputChange} />
                        </label>
                        <div className="form-actions">
                            <button onClick={handleSave} className="save-btn">Save</button>
                            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleEdit;
