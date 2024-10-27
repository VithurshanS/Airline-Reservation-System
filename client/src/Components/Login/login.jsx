import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Button from '@mui/material/Button';

export default function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [role, setRole] = useState('R_user'); // Define role state
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
            console.log(response.data);
            
            if (response.data.message === 201) {
                const user = response.data.user;
                setUserData(user);

                localStorage.setItem("user",  JSON.stringify(user));


                if (user.Role === 'Admin') {
                    navigate('/AdDashboard');
                } else {
                    navigate('/Home');
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
      <div className="body">
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleInput}>
                <label htmlFor="username" className="label">Username</label>
                    <input
                        className="input-field"
                        type="text"
                        id="username"
                        name="username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="pass" className="label">Password</label>
                    <input
                        className="input-field"
                        type="password"
                        id="pass"
                        name="pass"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="role" className="label">Select Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="role-select"
                    >
                        <option value="R_user">User</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>

            {getUserInfo()}
        </div>
        </div>
    );
}
