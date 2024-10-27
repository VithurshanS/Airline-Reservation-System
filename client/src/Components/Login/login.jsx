import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Button from '@mui/material/Button';

export default function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Define role state
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInput = async (event) => {
        event.preventDefault();
        console.log(Username);
       
        try {
            const response = await axios.post('http://localhost:3067/login', {
                Username: Username,
                Password: Password,
                Role: role // Include role in request payload
            });
            console.log(response);
            
            if (response.data.message === 201) {
                const user = response.data.user;
                setUserData(user);

                localStorage.setItem(user,  JSON.stringify(user));


                if (user.Role === 'admin') {
                    navigate('/AdDashboard');
                } else {
                    navigate('/Userpage');
                }
            } else if (response.data.message === 301) {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
        }
    };

    const getUserInfo = () => {
        if (userData) {
            return (<p className="user-info">{JSON.stringify(userData)}</p>);
        } else {
            return null;
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleInput}>
                    <label htmlFor="username">Username</label>
                    <input
                        className="input-field"
                        type="text"
                        id="username"
                        name="username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="pass">Password</label>
                    <input
                        className="input-field"
                        type="password"
                        id="pass"
                        name="pass"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="role">Select Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="role-select"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>

            {getUserInfo()}
        </div>
    );
}
