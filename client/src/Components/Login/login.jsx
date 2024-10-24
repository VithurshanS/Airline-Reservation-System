import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../Userdata/Userdata.js';
import axios from 'axios';
import './login.css';

export default function Login() {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(''); // Added for error message
    const navigate = useNavigate();

    const handleInput = async (event) => {
        event.preventDefault();

        // Check the hardcoded users
        const foundUser = users.find(user => 
            (user.Username === Username || user.Email === Email) && user.Password === Password
        );

        console.log(foundUser);

        await axios.post('http://localhost:3066/login', { Username, Password, Email })
            .then((response) => {
                if (response.data.length > 0) {
                    const user = response.data[0];
                    setUserData(user);
                    // Redirect based on role
                    if (foundUser.Role === 'Admin') {
                        navigate('/Adminpage'); // Admin dashboard
                    } else {
                        navigate('/Userpage');  // Regular user dashboard
                    }
                } else {
                    setError('Invalid username or email'); // Handle invalid login
                }
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred during login'); // Handle other errors
            });
    };

    const getUserInfo = () => {
        if (userData) {
            return (<p>{JSON.stringify(userData)}</p>);
        } else {
            return null;
        }
    };

    return (
        <div className='sss'>
            <div className="signup-div">
                <form>
                    <label htmlFor="name">Enter username</label>
                    <input className='name-in' type='text' id='name' name='name' onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="email">Enter email</label>
                    <input className='email-in' type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="pass">Enter password</label>
                    <input className="password-in" type='password' id='pass' name='pass' onChange={(e) => setPassword(e.target.value)} />

                    <input type='submit' onClick={handleInput}></input>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            </div>
            {getUserInfo()}
        </div>
    );
}
