import { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [Username, setUsername] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [Age, setAge] = useState();
    const [Passport_Number, setPaN] = useState('');
    const [Gender, setGender] = useState('');
    const [Role, setRole] = useState('registered user'); // default to 'user'
    const [Password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const navigate = useNavigate();
    const calculateAge = () => {
        const birthDate = new Date(DOB);
        const today = new Date();
        let Age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            Age--;
        }
        return Age;
    };

    const handleUserdata = (event) => {
        event.preventDefault();
        const age = calculateAge();
        setAge(age);
        axios.post('http://192.168.153.175:3066/add', {
            "User_Name":Username,
            "First_name":FirstName,
            "Last_name":LastName,
            "Email":Email,
            "PN":Passport_Number,
            "DOB":DOB,
            "A":Age,
            "Gender":Gender,
            "Password":Password,
            "Role":Role
        })
        .then((response) => {
            console.log(response.data);
            setResult(response.data);
            navigate('/components/Login/login'); // Redirect to login page after signup
        })
        .catch((error) => {
            console.error('Error during post request:', error);
        });
    };

    return (
        <div className='sss'>
            <div className="signup-div">
                <form className='form-container'>
                    <label htmlFor="username">Enter Username</label>
                    <input className='name-in' type='text' id='username' name='username' onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="firstName">Enter First Name</label>
                    <input type='text' id='firstName' name='firstName' onChange={(e) => setFirstName(e.target.value)} />

                    <label htmlFor="lastName">Enter Last Name</label>
                    <input type='text' id='lastName' name='lastName' onChange={(e) => setLastName(e.target.value)} />

                    <label htmlFor="email">Enter Email</label>
                    <input type='email' id='email' name='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="dob">Enter Date of Birth</label>
                    <input type='date' id='dob' name='dob' onChange={(e) => setDOB(e.target.value)} />

                    <label htmlFor="PaN">Enter Passport Number</label>
                    <input type='text' onChange={(e) => setPaN(e.target.value)} />

                    <label htmlFor="gender">Select Gender</label>
                    <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="password">Enter Password</label>
                    <input className="password-in" type='password' id='password' name='password' onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="role">Select Role</label>
                    <select id="role" name="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="registered user">ser</option>
                        <option value="admin">Admin</option>
                    </select>

                    <input type='Submit' onClick={handleUserdata}></input>
                </form>
            </div>
            <div>
                
                <p>{result}</p>
            </div>
        </div>
    );
}
