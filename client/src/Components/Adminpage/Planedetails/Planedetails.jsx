import { useState } from 'react';
import './Planedetails.css';

const PlaneDetails = () => {
    const [planes, setPlanes] = useState([
        { id: 1, aircraftName: 'Boeing 737', planeName: 'Sky Hawk' },
        { id: 2, aircraftName: 'Airbus A380', planeName: 'Eagle One' },
        { id: 3, aircraftName: 'Boeing 757', planeName: 'Falcon Flyer' },
        { id: 4, aircraftName: 'Boeing 737', planeName: 'Blue Bird' },
        { id: 5, aircraftName: 'Airbus A320', planeName: 'Jet Stream' },
    ]);

    const [editedPlane, setEditedPlane] = useState(null);
    const [newPlane, setNewPlane] = useState({ id: '', aircraftName: '', planeName: '' });

    const handleEdit = (plane) => {
        setEditedPlane(plane);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPlane({ ...editedPlane, [name]: value });
    };

    const handleSave = () => {
        setPlanes(planes.map(plane => plane.id === editedPlane.id ? editedPlane : plane));
        setEditedPlane(null);
    };

    const handleCancel = () => {
        setEditedPlane(null);
    };

    const handleDelete = (id) => {
        setPlanes(planes.filter(plane => plane.id !== id));
    };

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewPlane({ ...newPlane, [name]: value });
    };

    const handleAdd = () => {
        const newPlaneEntry = { ...newPlane, id: planes.length + 1 };
        setPlanes([...planes, newPlaneEntry]);
        setNewPlane({ id: '', aircraftName: '', planeName: '' });
    };

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planes.map(plane => (
                            <tr key={plane.id}>
                                <td>{plane.id}</td>
                                <td>{plane.aircraftName}</td>
                                <td>{plane.planeName}</td>
                                <td>
                                    <button onClick={() => handleEdit(plane)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(plane.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {editedPlane && (
                    <div className="edit-form">
                        <h3>Edit Plane Details</h3>
                        <label>
                            ID:
                            <input type="text" name="id" value={editedPlane.id} onChange={handleInputChange} disabled />
                        </label>
                        <label>
                            Aircraft Name:
                            <input type="text" name="aircraftName" value={editedPlane.aircraftName} onChange={handleInputChange} />
                        </label>
                        <label>
                            Plane Name:
                            <input type="text" name="planeName" value={editedPlane.planeName} onChange={handleInputChange} />
                        </label>
                        <div className="form-actions">
                            <button onClick={handleSave} className="save-btn">Save</button>
                            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                )}

                <div className="add-form">
                    <h3>Add New Plane</h3>
                    <label>
                        Aircraft Name:
                        <input type="text" name="aircraftName" value={newPlane.aircraftName} onChange={handleAddChange} />
                    </label>
                    <label>
                        Plane Name:
                        <input type="text" name="planeName" value={newPlane.planeName} onChange={handleAddChange} />
                    </label>
                    <div className="form-actions">
                        <button onClick={handleAdd} className="add-btn">Add Plane</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaneDetails;
