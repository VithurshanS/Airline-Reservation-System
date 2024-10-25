import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
// "import users from '../Userdata/Userdata.js';
import Button from '@mui/material/Button';


export default function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(''); // For displaying error messages
    const navigate = useNavigate();

    const handleInput = async (event) => {
        event.preventDefault();
        console.log(Username);

        try {
            // Attempt to fetch data from the backend API
            const response = await axios.post('http://192.168.153.175:3066/get', { "Username":Username, "Password":Password });
            console.log(response);
            
            if (response.data.message === 201) {
                const user = response.data.user;
                
                setUserData(user); // Set user data if found
                
                // Redirect based on the user's role
                if (user.Role === 'Admin') {
                    navigate('/Adminpage'); // Redirect to Admin dashboard
                } else {
                    navigate('/Userpage'); // Redirect to User dashboard
                }
            } else if (response.data.message === 301) {
                setError('Invalid username or password'); // Handle wrong credentials
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login'); // Handle server or connection errors
        }
    };

    const getUserInfo = () => {
        if (userData) {
            return (<p>{JSON.stringify(userData)}</p>); // Show user info for testing
        } else {
            return null;
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleInput}>
                    <label htmlFor="username">Enter username</label>
                    <input
                        className="input-field"
                        type="text"
                        id="username"
                        name="username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="pass">Enter password</label>
                    <input
                        className="input-field"
                        type="password"
                        id="pass"
                        name="pass"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>

                {/* Error message display */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            {/* Display user info if available */}
            {getUserInfo()}
        </div>
    );
}
