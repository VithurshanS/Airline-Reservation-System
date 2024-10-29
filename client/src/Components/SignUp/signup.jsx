import { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Signup() {
    const [Username, setUsername] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [Gender, setGender] = useState('');
    const [Role, setRole] = useState('R_user'); // default to 'registered user'
    const [Password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const navigate = useNavigate();

    const handleUserdata = async (event) => {
        event.preventDefault();

        // Validate required fields before making the API call
        if (!Username || !FirstName || !LastName || !Email || !DOB || !Gender || !Password) {
            setResult("All fields are required.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3067/signup', {
                User_Name: Username,
                First_name: FirstName,
                Last_name: LastName,
                Email: Email,
                DOB: DOB,
                Gender: Gender,
                Password: Password,
                Role: Role
            });
            
            setResult(response.data.message); // Display success message from backend
            navigate('/login'); 
           
        } catch (error) {
            console.error('Error during post request:', error);
            setResult('Signup failed. Please try again.');
        }
    };

    return (
        <div className='sss'>
            <div className="signup-div">
                <form className='form-container' onSubmit={handleUserdata}> {/* Corrected form submission */}
                    <label htmlFor="username" className='label1'>Enter Username</label>
                    <input
                        className='input1'
                        type='text'
                        id='username'
                        name='username'
                        onChange={(e) => setUsername(e.target.value)}
                        value={Username}
                    />

                    <label htmlFor="firstName" className='label1'>Enter First Name</label>
                    <input
                        className='input1'
                        type='text'
                        id='firstName'
                        name='firstName'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={FirstName}
                    />

                    <label htmlFor="lastName" className='label1'>Enter Last Name</label>
                    <input
                        className='input1'
                        type='text'
                        id='lastName'
                        name='lastName'
                        onChange={(e) => setLastName(e.target.value)}
                        value={LastName}
                    />

                    <label htmlFor="email" className='label1' style={{paddingLeft:"35px"}}>Enter Email</label>
                    <input
                        className='input1'
                        type='email'
                        id='email'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                    />

                    <label htmlFor="dob" className='label1'>Enter Date of Birth</label>
                    <input
                        className='input1'
                        type='date'
                        id='dob'
                        name='dob'
                        onChange={(e) => setDOB(e.target.value)}
                        value={DOB}
                    />

                    <label htmlFor="PaN" className='label1'>Enter Passport Number</label>
                    <input
                        className='input1'
                        type='text'
                        id='PaN'
                        name='PaN'
                        //onChange={(e) => setPaN(e.target.value)}
                    />

                    <label htmlFor="gender" className='label1' style={{paddingLeft:"20px"}}>Select Gender</label>
                    <select
                        className='input1'
                        id="gender"
                        name="gender"
                        onChange={(e) => setGender(e.target.value)}
                        value={Gender}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="password" className='label1'>Enter Password</label>
                    <input
                        className="password-in"
                        type='password'
                        id='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={Password}
                    />

                    <label htmlFor="role" className='label1'>Select Role</label>
                    <select
                        id="role"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={Role}
                    >
                        <option value="R_user">User</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Signup
                    </Button>
                </form>
            </div>
            <div>
                <p>{result}</p>
            </div>
        </div>
    );
}
