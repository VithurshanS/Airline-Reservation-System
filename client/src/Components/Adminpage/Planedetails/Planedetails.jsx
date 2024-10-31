import { useState, useEffect } from 'react';
import axios from 'axios';
import './Planedetails.css';

const PlaneDetails = () => {
    const [planes, setPlanes] = useState([]);
    const [editedPlane, setEditedPlane] = useState(null);
    const [newPlane, setNewPlane] = useState({ aircraftId: '', planeName: '' });
    const [result, setResult] = useState('');

    useEffect(() => {
        // Fetch all planes on component load
        const fetchPlanes = async () => {
            try {
                const response = await axios.get('http://localhost:3067/getallplane');
                setPlanes(response.data.result); // Accessing the 'result' array from the response
            } catch (error) {
                console.error("Error fetching planes:", error);
            }
        };
        fetchPlanes();
    }, []);

    const handleAddChange = (e) => {
        const { name, value } = e.target;
        setNewPlane({ ...newPlane, [name]: value });
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:3067/addplane', {
                Aircraft_ID: newPlane.aircraftId,
                Plane_name: newPlane.planeName,
            });
            setResult(response.data.message);
            alert(response.data.message);

            // Fetch updated plane list after successful addition
            const updatedResponse = await axios.get('http://localhost:3067/getallplane');
            setPlanes(updatedResponse.data.result);

            setNewPlane({ aircraftId: '', planeName: '' });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="page-background">
            <div className="plane-details-container">
                <h2>Plane Details</h2>
                <table className="plane-table">
                    <thead>
                        <tr>
                            <th>Plane ID</th>
                            <th>Aircraft ID</th>
                            <th>Plane Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planes.map(plane => (
                            <tr key={plane.Plane_ID}>
                                <td>{plane.Plane_ID}</td>
                                <td>{plane.Aircraft_ID}</td>
                                <td>{plane.Plane_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="add-form">
                    <h3>Add New Plane</h3>
                    <label>
                        Aircraft ID:
                        <input type="number" name="aircraftId" value={newPlane.aircraftId} onChange={handleAddChange} />
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

export default PlaneDetails;