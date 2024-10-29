import { useState } from 'react';
import './Routes.css';

const Route = () => {
    const [routes, setRoutes] = useState([
        { route_id: 101, departure_airport: 'JFK', arrival_airport: 'LAX' },
        { route_id: 102, departure_airport: 'ORD', arrival_airport: 'DFW' },
        { route_id: 103, departure_airport: 'ATL', arrival_airport: 'MIA' },
        { route_id: 104, departure_airport: 'LHR', arrival_airport: 'DXB' },
        { route_id: 105, departure_airport: 'SIN', arrival_airport: 'SYD' },
    ]);

    const [editingRoute, setEditingRoute] = useState(null);
    const [newRoute, setNewRoute] = useState({ route_id: '', departure_airport: '', arrival_airport: '' });

    const handleEdit = (route) => {
        setEditingRoute(route);
        setNewRoute(route);
    };

    const handleDelete = (route_id) => {
        setRoutes(routes.filter(route => route.route_id !== route_id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRoute(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editingRoute) {
            // Update existing route
            setRoutes(routes.map(route => (route.route_id === editingRoute.route_id ? newRoute : route)));
            setEditingRoute(null);
        } else {
            // Add new route
            setRoutes([...routes, { ...newRoute, route_id: parseInt(newRoute.route_id) }]);
        }
        setNewRoute({ route_id: '', departure_airport: '', arrival_airport: '' });
    };

    const handleCancel = () => {
        setEditingRoute(null);
        setNewRoute({ route_id: '', departure_airport: '', arrival_airport: '' });
    };

    return (
        <div className="page-background">
            <div className="admin-page-container">
                <h2>Route Management</h2>

                <table className="route-table">
                    <thead>
                        <tr>
                            <th>Route ID</th>
                            <th>Departure Airport</th>
                            <th>Arrival Airport</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(route => (
                            <tr key={route.route_id}>
                                <td>{route.route_id}</td>
                                <td>{route.departure_airport}</td>
                                <td>{route.arrival_airport}</td>
                                {/* <td>
                                    <button className="edit-btn" onClick={() => handleEdit(route)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(route.route_id)}>Delete</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>{editingRoute ? 'Edit Route' : 'Add Route'}</h3>
                <div className="form-container">
                    <label>
                        Route ID:
                        <input type="number" name="route_id" value={newRoute.route_id} onChange={handleChange} />
                    </label>
                    <label>
                        Departure Airport:
                        <input type="text" name="departure_airport" value={newRoute.departure_airport} onChange={handleChange} />
                    </label>
                    <label>
                        Arrival Airport:
                        <input type="text" name="arrival_airport" value={newRoute.arrival_airport} onChange={handleChange} />
                    </label>
                    <div className="form-actions">
                        <button className="save-btn" onClick={handleSave}>{editingRoute ? 'Update' : 'Add'}</button>
                        {editingRoute && <button className="cancel-btn" onClick={handleCancel}>Cancel</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Route;