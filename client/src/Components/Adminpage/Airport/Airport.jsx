import { useState, useEffect } from 'react';
import './Airport.css';
import axios from 'axios';

const AirportManagement = () => {
    const [airports, setAirports] = useState([]);
    const [editedAirport, setEditedAirport] = useState(null);
    const [newAirport, setNewAirport] = useState({ airportCode: '', airportName: '', location: '' });

    const handleEdit = (airport) => {
        setEditedAirport(airport);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAirport({ ...editedAirport, [name]: value });
    };

    const handleSave = () => {
        setAirports(airports.map(airport => airport.id === editedAirport.id ? editedAirport : airport));
        setEditedAirport(null);
    };

    const handleCancel = () => {
        setEditedAirport(null);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewAirport({ ...newAirport, [name]: value });
    };

    const handleAdd = async () => {
        try {
            // Split the location string by commas and trim each part to remove extra whitespace
            const locationArray = newAirport.location.split(',').map(part => part.trim());
    
            const response = await axios.post('http://localhost:3067/addairport', {
                Airport_Code: newAirport.airportCode,
                Airport_name: newAirport.airportName,
                Location: locationArray,  // Pass location as an array
            });
    
            alert(response.data.message);
            setNewAirport({ airportCode: '', airportName: '', location: '' });
            fetchAirports(); 
             // Refresh the list after adding a new airport
             alert("airport add successfully");
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3067/deleteairport/${id}`);
            setAirports(airports.filter(airport => airport.id !== id));
        } catch (error) {
            console.error("An error occurred while deleting:", error);
        }
    };

    const fetchAirports = async () => {
        try {
            const response = await axios.get('http://localhost:3067/getairport');
            
            if (response.data.message === 'Airports retrieved successfully.' && response.data.result) {
                const formattedAirports = response.data.result.map((airport) => ({
                      // Ensure this field exists or adjust according to your API
                    airportCode: airport.Airport_Code,
                    airportName: airport.Airport_name,
                    location: airport.Location_ID
                }));
                setAirports(formattedAirports);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    };

    useEffect(() => {
        fetchAirports();
    }, []);

    return (
        <div className="page-background">
            <div className="airport-management-container">
                <h2>Airport Management</h2>
                
                <table className="airport-table">
                    <thead>
                        <tr>
                            <th>Airport Code</th>
                            <th>Airport Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {airports.map((airport) => (
                            <tr key={airport.id}>
                                <td>{airport.airportCode}</td>
                                <td>{airport.airportName}</td>
                                <td>{airport.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editedAirport && (
                    <div className="edit-form">
                        <h3>Edit Airport Details</h3>
                        <label>
                            ID:
                            <input type="text" name="id" value={editedAirport.id} onChange={handleInputChange} disabled />
                        </label>
                        <label>
                            Airport Code:
                            <input type="text" name="airportCode" value={editedAirport.airportCode} onChange={handleInputChange} />
                        </label>
                        <label>
                            Airport Name:
                            <input type="text" name="airportName" value={editedAirport.airportName} onChange={handleInputChange} />
                        </label>
                        <label>
                            Location:
                            <input type="text" name="location" value={editedAirport.location} onChange={handleInputChange} />
                        </label>
                        <div className="form-actions">
                            <button onClick={handleSave} className="save-btn">Save</button>
                            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                )}

                <div className="add-form">
                    <h3>Add New Airport</h3>
                    <label>
                        Airport Code:
                        <input type="text" name="airportCode" value={newAirport.airportCode} onChange={handleAddChange} />
                    </label>
                    <label>
                        Airport Name:
                        <input type="text" name="airportName" value={newAirport.airportName} onChange={handleAddChange} />
                    </label>
                    <label>
                        Location:
                        <input type="text" name="location" value={newAirport.location} onChange={handleAddChange} />
                    </label>
                    <div className="form-actions">
                        <button onClick={handleAdd} className="add-btn">Add Airport</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AirportManagement;
