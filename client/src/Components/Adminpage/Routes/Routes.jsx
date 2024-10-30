import { useState, useEffect } from 'react';
import axios from 'axios';
import './Routes.css';

const Route = () => {
    const [routes, setRoutes] = useState([]);
    const [editingRoute, setEditingRoute] = useState(null);
    const [newRoute, setNewRoute] = useState({ route_id: '', departure_airport: '', arrival_airport: '' });

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:3067/getallroute');
            if (response.data.message === 'All routes retrieved successfully.') {
                const formattedRoutes = response.data.results.map(route => ({
                    route_id: route.Route_ID,
                    departure_airport: route.Departure_Airport,
                    arrival_airport: route.Arrival_Airport
                }));
                setRoutes(formattedRoutes);
            }
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

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

    const handleSave = async () => {
        if (editingRoute) {
            setRoutes(routes.map(route => (route.route_id === editingRoute.route_id ? newRoute : route)));
            setEditingRoute(null);
        } else {
            try {
                const response = await axios.post('http://localhost:3067/addroute', {
                    Depature_Airport: newRoute.departure_airport,
                    Arival_Airport: newRoute.arrival_airport,
                });
                if (response.data.message === 'Route added successfully.') {
                    setRoutes([...routes, {
                        route_id: response.data.result,
                        departure_airport: newRoute.departure_airport,
                        arrival_airport: newRoute.arrival_airport,
                    }]);
                    setNewRoute({ route_id: '', departure_airport: '', arrival_airport: '' });
                }
            } catch (error) {
                console.error('Error adding route:', error);
            }
        }
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
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(route => (
                            <tr key={route.route_id}>
                                <td>{route.route_id}</td>
                                <td>{route.departure_airport}</td>
                                <td>{route.arrival_airport}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>{editingRoute ? 'Edit Route' : 'Add Route'}</h3>
                <div className="form-container">
                    <label>
                        Route ID:
                        <input type="number" name="route_id" value={newRoute.route_id} onChange={handleChange} disabled={!!editingRoute} />
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