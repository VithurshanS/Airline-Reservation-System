import { useState } from 'react';
import './Airport.css';
import axios from 'axios';
const AirportManagement = () => {
    const [airports, setAirports] = useState([
        { id: 1, airportCode: 'CMB', airportName: 'Bandaranaike International Airport', location: 'Colombo, Western, Sri Lanka' },
        { id: 2, airportCode: 'TRR', airportName: 'Ratmalana Airport', location: 'Ratmalana, Western, Sri Lanka' },
        { id: 3, airportCode: 'HRI', airportName: 'Jaffna International Airport', location: 'Jaffna, Northern, Sri Lanka' },
    ]);

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

    // const handleAdd = () => {
    //     setAirports([...airports, { id: airports.length + 1, ...newAirport }]);
    //     setNewAirport({ airportCode: '', airportName: '', location: '' });
    // };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:3067/addairport', {
                    Airport_Code :newAirport.airportCode,
                    Airport_name : newAirport.airportName,
                    Location :  newAirport.location,
            });
            setResult(response.data.message);
            alert(response.data.message);
            setNewAirport({ airportCode: '', airportName: '', location: '' });
            
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const handleDelete = (id) => {
        const updatedAirports = airports.filter(airport => airport.id !== id);
        setAirports(updatedAirports);
    };

    return (
        <div className="page-background">
            <div className="airport-management-container">
                <h2>Airport Management</h2>
                
                <table className="airport-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Airport Code</th>
                            <th>Airport Name</th>
                            <th>Location</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {airports.map(airport => (
                            <tr key={airport.id}>
                                <td>{airport.id}</td>
                                <td>{airport.airportCode}</td>
                                <td>{airport.airportName}</td>
                                <td>{airport.location}</td>
                                {/* <td>
                                    <button onClick={() => handleEdit(airport)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(airport.id)} className="delete-btn">Delete</button>
                                </td> */}
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
