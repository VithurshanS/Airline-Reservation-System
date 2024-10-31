import { useState, useEffect } from 'react';
import './Aircraft.css';
import axios from 'axios';


const AircraftEdit = () => {
    const [aircrafts, setAircrafts] = useState([]);
    const [editedAircraft, setEditedAircraft] = useState(null);
    const [newAircraft, setNewAircraft] = useState({ id: '', company: '', type: '', totalSeats: '', economyStart: '', businessStart: '', platinumStart: '' });
    const [result, setResult] = useState('');

    useEffect(() => {
        fetchAircraft();
    }, []);

    const fetchAircraft = async () => {
        try {
            const response = await axios.get('http://localhost:3067/getallaircraft');
            if (response.data.message === 'All aircraft retrieved successfully.' && response.data.results) {
                const formattedAircrafts = response.data.results.map((aircraft) => ({
                    id: aircraft.Aircraft_ID,
                    company: aircraft.Company,
                    type: aircraft.Aircraft_type,
                    totalSeats: aircraft.Total_seats,
                    economyStart: aircraft.Economy_seat_start_no,
                    businessStart: aircraft.Business_seat_start_no,
                    platinumStart: aircraft.Platinum_seat_start_no
                }));
                setAircrafts(formattedAircrafts);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching aircraft:', error);
        }
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewAircraft({ ...newAircraft, [name]: value });
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:3067/addaircraft', {
                company: newAircraft.company,
                AircraftType: newAircraft.type,
                totalseats: newAircraft.totalSeats,
                ESSN: newAircraft.economyStart,
                BSSN: newAircraft.businessStart,
                PSSN: newAircraft.platinumStart,
            });
            setResult(response.data.message);
            alert(response.data.message);
            setNewAircraft({ id: '', company: '', type: '', totalSeats: '', economyStart: '', businessStart: '', platinumStart: '' });
            fetchAircraft(); // Refresh the list after adding new aircraft
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="page-background">
            <div className="aircraft-edit-container">
                <h2>Aircraft Management</h2>
                
                <table className="aircraft-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Company</th>
                            <th>Type</th>
                            <th>Total Seats</th>
                            <th>Economy Seats Start</th>
                            <th>Business Seats Start</th>
                            <th>Platinum Seats Start</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aircrafts.map(aircraft => (
                            <tr key={aircraft.id}>
                                <td>{aircraft.id}</td>
                                <td>{aircraft.company}</td>
                                <td>{aircraft.type}</td>
                                <td>{aircraft.totalSeats}</td>
                                <td>{aircraft.economyStart}</td>
                                <td>{aircraft.businessStart}</td>
                                <td>{aircraft.platinumStart}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="add-form">
                    <h3>Add New Aircraft</h3>
                    <label>
                        Company:
                        <input type="text" name="company" value={newAircraft.company} onChange={handleAddChange} />
                    </label>
                    <label>
                        Type:
                        <input type="text" name="type" value={newAircraft.type} onChange={handleAddChange} />
                    </label>
                    <label>
                        Total Seats:
                        <input type="number" name="totalSeats" value={newAircraft.totalSeats} onChange={handleAddChange} />
                    </label>
                    <label>
                        Economy Seats Start:
                        <input type="number" name="economyStart" value={newAircraft.economyStart} onChange={handleAddChange} />
                    </label>
                    <label>
                        Business Seats Start:
                        <input type="number" name="businessStart" value={newAircraft.businessStart} onChange={handleAddChange} />
                    </label>
                    <label>
                        Platinum Seats Start:
                        <input type="number" name="platinumStart" value={newAircraft.platinumStart} onChange={handleAddChange} />
                    </label>
                    <div className="form-actions">
                        <button onClick={handleAdd} className="add-btn">Add Aircraft</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AircraftEdit;
