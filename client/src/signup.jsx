import React, {useState,useEffect} from 'react'
import axios from 'axios';
import "./assets/signup.css";


export default function Signup(){
    const [Username , setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [DOB,setDOB] = useState();
    const[Age,setAge] = useState()
    const [Passenger_Name, setPN] = useState();
    const [Passport_Number, setPaN] = useState();
    const [result,setResult] = useState('');

    const calculateAge =()=>{
        const birdate = new Date(DOB);
        const today = new Date();
        let age = today.getFullYear()-birdate.getFullYear();
        const mon = today.getMonth()-birdate.getMonth();
        if(mon<0){
            age--;
        }
        console.log(age);
        return age;
    }

    const handleUserdata = (event) =>{
        event.preventDefault();
        const age = calculateAge();
        setAge(age);
        axios.post('http://localhost:3066/signup/details',{Passenger_Name,Passport_Number,DOB,Age:age,Username,Password})
        .then((response)=>{
            console.log(response.data);
            setResult(response.data);

        })
        .catch((error)=>{
            console.error('error when post');
        })
    }



    return (
        <div className='sss'>
        <div className="signup-div">
            <form className='form-container'>
                <label htmlFor="name">Enter username</label>
                <input className='name-in' type='text' id='name' name='name' onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor="pass">Enter password:</label>
                <input className="password-in" type='password' id='pass' name='pass' onChange={(e)=>setPassword(e.target.value)}/>
                <label htmlFor="DOB">Enter DateofBirth</label>
                <input type='date' onChange={(e)=>setDOB(e.target.value)}/>
                <label htmlFor="PN">name:</label>
                <input type='text' onChange={(e)=>setPN(e.target.value)}/>
                <label htmlFor="PaN">Passport Number:</label>
                <input type='text' onChange={(e)=>setPaN(e.target.value)}/>
                <input type='submit' onClick={handleUserdata}></input>

            </form>
        </div>
        <div>
            <p>hi da machn {result}</p>
        </div>

        </div>

    )
}


