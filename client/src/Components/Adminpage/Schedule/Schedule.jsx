import { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';

const ScheduleEdit = () => {
    const [schedules, setSchedules] = useState([]);
    const [editedSchedule, setEditedSchedule] = useState(null);
    const [newSchedule, setNewSchedule] = useState({
        flightNumber: '', airplane: '', departureDate: '', departureTime: '', arrivalDate: '', arrivalTime: '', economyFare: '', businessFare: '', platinumFare: ''
    });

    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:3067/getscheduleall');
            
            if (response.data.message === 'Successfully retrieved schedules.' && response.data.results) {
                const formattedSchedules = response.data.results.map((schedule) => ({
                    id: schedule.Schedule_ID,
                    flightNumber: schedule.Route_ID,
                    airplane: schedule.Plane_ID,
                    departureTime: schedule.Departure_Time,
                    arrivalTime: schedule.Arrival_Time,
                    economyFare: schedule.Economy_Fare,
                    businessFare: schedule.Business_Fare,
                    platinumFare: schedule.Platinum_Fare
                }));
                setSchedules(formattedSchedules);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleInputChange = (e, isNew = false) => {
        const { name, value } = e.target;
        if (isNew) {
            setNewSchedule({ ...newSchedule, [name]: value });
        } else {
            setEditedSchedule({ ...editedSchedule, [name]: value });
        }
    };

    // const handleAddNewFlight = async () => {
    //     const departureDateTime = `${newSchedule.departureDate} ${newSchedule.departureTime}`;
    //     const arrivalDateTime = `${newSchedule.arrivalDate} ${newSchedule.arrivalTime}`;

    //     try {
    //         const response = await axios.post('http://localhost:3067/addschedule', {
    //             Route_ID: newSchedule.flightNumber,
    //             Plane_ID: newSchedule.airplane,
    //             Departure_Time: departureDateTime,
    //             Arrival_Time: arrivalDateTime,
    //             Economy_Fare: newSchedule.economyFare,
    //             Business_Fare: newSchedule.businessFare,
    //             Platinum_Fare: newSchedule.platinumFare
    //         });
    //         console.log('shedule added',response.data.message);

    //         if (response.data.message === 'Insertion successful.') {
    //             fetchSchedules();
    //             alert("Schedule added successfully.");
    //         } else {
    //             console.error("Error adding schedule:", response.data);
    //         }

    //         setNewSchedule({ flightNumber: '', airplane: '', departureDate: '', departureTime: '', arrivalDate: '', arrivalTime: '', economyFare: '', businessFare: '', platinumFare: '' });
    //     } catch (error) {
    //         console.error("Error adding schedule:", error);
    //     }
    // };

    const handleAddNewFlight = async () => {
        const formatDateTime = (date, time) => `${date} ${time}:00`;
    
        const departureDateTime = formatDateTime(newSchedule.departureDate, newSchedule.departureTime);
        const arrivalDateTime = formatDateTime(newSchedule.arrivalDate, newSchedule.arrivalTime);
    
        try {
            const response = await axios.post('http://localhost:3067/addschedule', {
                Route_ID: newSchedule.flightNumber,
                Plane_ID: newSchedule.airplane,
                Departure_Time: departureDateTime,
                Arrival_Time: arrivalDateTime,
                Economy_Fare: newSchedule.economyFare,
                Business_Fare: newSchedule.businessFare,
                Platinum_Fare: newSchedule.platinumFare
            });
    
            console.log('Schedule added:', response.data.message);
    
            if (response.data.message === 'Insertion successful.') {
                fetchSchedules();
                alert("Schedule added successfully.");
            } else {
                console.error("Error adding schedule:", response.data);
            }
    
            setNewSchedule({ flightNumber: '', airplane: '', departureDate: '', departureTime: '', arrivalDate: '', arrivalTime: '', economyFare: '', businessFare: '', platinumFare: '' });
        } catch (error) {
            console.error("Error adding schedule:", error);
        }
    };
    

    return (
        <div className="page-background">
            <div className="schedule-edit-container">
                <h2>Flight Schedule Management</h2>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Schedule ID</th>
                            <th>Route ID</th>
                            <th>Airplane</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Economy Fare</th>
                            <th>Business Fare</th>
                            <th>Platinum Fare</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.id}>
                                <td>{schedule.id}</td>
                                <td>{schedule.flightNumber}</td>
                                <td>{schedule.airplane}</td>
                                <td>{schedule.departureTime}</td>
                                <td>{schedule.arrivalTime}</td>
                                <td>{schedule.economyFare}</td>
                                <td>{schedule.businessFare}</td>
                                <td>{schedule.platinumFare}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="add-new-form">
                    <h3>Add New Flight Schedule</h3>
                    <label>
                        Route ID:
                        <input type="text" name="flightNumber" value={newSchedule.flightNumber} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Airplane ID:
                        <input type="text" name="airplane" value={newSchedule.airplane} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Departure Date:
                        <input type="date" name="departureDate" value={newSchedule.departureDate} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Departure Time:
                        <input type="time" name="departureTime" value={newSchedule.departureTime} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Arrival Date:
                        <input type="date" name="arrivalDate" value={newSchedule.arrivalDate} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Arrival Time:
                        <input type="time" name="arrivalTime" value={newSchedule.arrivalTime} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Economy Fare:
                        <input type="number" name="economyFare" value={newSchedule.economyFare} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Business Fare:
                        <input type="number" name="businessFare" value={newSchedule.businessFare} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <label>
                        Platinum Fare:
                        <input type="number" name="platinumFare" value={newSchedule.platinumFare} onChange={(e) => handleInputChange(e, true)} />
                    </label>
                    <div className="form-actions">
                        <button onClick={handleAddNewFlight} className="save-btn">Add Flight</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleEdit;
