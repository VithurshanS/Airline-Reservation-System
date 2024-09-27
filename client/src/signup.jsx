import React, {useState,useEffect} from 'react'
import axios from 'axios';
import "./assets/signup.css";


export default function Signup(){
    const [username , setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUserdata = () =>{
        axios.post('http://localhost:3066/signup',{username,password})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=>{
            console.error('error when post');
        })
    }

    return (
        <div>
            <form>
                <lable for="name">Enter username</lable>
                <input className='name-in' type='text' id='name' name='name' onChange={(e)=>setUsername(e.target.value)}/>
                <label for="pass">Enter password:</label>
                <input className="password-in" type='password' id='pass' name='pass' onChange={(e)=>setPassword(e.target.value)}/>
                <button className="submit" onClick={handleUserdata} >Submit</button>

            </form>
            <div>
                <p>username is {username}<br/></p>
            </div>
        </div>

    )
}


