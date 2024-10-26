import { useState } from 'react';
import './Aircraft.css';

const AircraftEdit = () => {
    const [aircrafts, setAircrafts] = useState([
        { id: 1, company: 'Boeing', type: '737', totalSeats: 180, economyStart: 1, businessStart: 181, platinumStart: 191 },
        { id: 2, company: 'Airbus', type: 'A380', totalSeats: 500, economyStart: 1, businessStart: 301, platinumStart: 401 },
        { id: 3, company: 'Boeing', type: '757', totalSeats: 200, economyStart: 1, businessStart: 101, platinumStart: 151 },
    ]);
    
    const [editedAircraft, setEditedAircraft] = useState(null);
    const [newAircraft, setNewAircraft] = useState({ id: '', company: '', type: '', totalSeats: '', economyStart: '', businessStart: '', platinumStart: '' });

    const handleEdit = (aircraft) => {
        setEditedAircraft(aircraft);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAircraft({ ...editedAircraft, [name]: value });
    };

    const handleSave = () => {
        setAircrafts(aircrafts.map(aircraft => aircraft.id === editedAircraft.id ? editedAircraft : aircraft));
        setEditedAircraft(null);
    };

    const handleCancel = () => {
        setEditedAircraft(null);
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewAircraft({ ...newAircraft, [name]: value });
    };

    const handleAdd = () => {
        setAircrafts([...aircrafts, { ...newAircraft, id: aircrafts.length + 1 }]);
        setNewAircraft({ id: '', company: '', type: '', totalSeats: '', economyStart: '', businessStart: '', platinumStart: '' });
    };

    const handleDelete = (id) => {
        setAircrafts(aircrafts.filter(aircraft => aircraft.id !== id));
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
                            <th>Actions</th>
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
                                <td>
                                    <button onClick={() => handleEdit(aircraft)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(aircraft.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editedAircraft && (
                    <div className="edit-form">
                        <h3>Edit Aircraft Details</h3>
                        <label>
                            ID:
                            <input type="text" name="id" value={editedAircraft.id} onChange={handleInputChange} disabled />
                        </label>
                        <label>
                            Company:
                            <input type="text" name="company" value={editedAircraft.company} onChange={handleInputChange} />
                        </label>
                        <label>
                            Type:
                            <input type="text" name="type" value={editedAircraft.type} onChange={handleInputChange} />
                        </label>
                        <label>
                            Total Seats:
                            <input type="number" name="totalSeats" value={editedAircraft.totalSeats} onChange={handleInputChange} />
                        </label>
                        <label>
                            Economy Seats Start:
                            <input type="number" name="economyStart" value={editedAircraft.economyStart} onChange={handleInputChange} />
                        </label>
                        <label>
                            Business Seats Start:
                            <input type="number" name="businessStart" value={editedAircraft.businessStart} onChange={handleInputChange} />
                        </label>
                        <label>
                            Platinum Seats Start:
                            <input type="number" name="platinumStart" value={editedAircraft.platinumStart} onChange={handleInputChange} />
                        </label>
                        <div className="form-actions">
                            <button onClick={handleSave} className="save-btn">Save</button>
                            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                )}

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
