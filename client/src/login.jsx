import React, {useState,useEffect} from 'react'
import axios from 'axios';
import "./assets/signup.css";

export default function Login(){
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [userData, setUserdata] = useState(null);

    const handleInput = async (event)=>{
        event.preventDefault();
        await axios.post('http://localhost:3066/hi/login',{Username,Password}).then((response)=>{
            setUserdata(response.data[0]);
        }).catch((error)=>{
            console.log(error);
        })
    }
    const getDOB = ()=>{
        if(userData){
            return( <p>{JSON.stringify(userData)}</p>)
        }else{
            return null;
        }
        
    }



    return(
        <div className='sss'>
        <div className="signup-div">
            <form>
                <label htmlFor="name">Enter username</label>
                <input className='name-in' type='text' id='name' name='name' onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor="pass">Enter password:</label>
                <input className="password-in" type='password' id='pass' name='pass' onChange={(e)=>setPassword(e.target.value)}/>
                {/*<label htmlFor="DOB">Enter DateofBirth</label>
                <input type='date' onChange={(e)=>setDOB(e.target.value)}/>
                <label htmlFor="PN">name:</label>
                <input type='text' onChange={(e)=>setPN(e.target.value)}/>
                <label htmlFor="PaN">Passport Number:</label>
                <input type='text' onChange={(e)=>setPaN(e.target.value)}/>*/}
                <input type='submit' onClick={handleInput}></input>

            </form>
        </div>
               {getDOB()}
        </div>
    )

// fnhfhh
} 