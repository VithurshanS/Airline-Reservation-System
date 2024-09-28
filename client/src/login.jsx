import React, {useState,useEffect} from 'react'
import axios from 'axios';

export default function Login(){
    const [data , setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3066/display').then((res)=>{setData(res.data)}).catch((err)=>{
            console.log("error")
        })
    },[])
    let ele = data.map(function(user){
        return(
            <tr >
                <td>{user.Passenger_ID}</td>
                <td>{user.Passenger_Name}</td>
                <td>{user.Passport_Number}</td>
                <td>{user.DOB}</td>
                <td>{user.Age}</td>
                <td>{user.Bookings_count}</td>
                <td>{user.Passenger_category}</td>
                <td>{user.Username}</td>
                <td>{user.Password}</td>
                <td>{user.is_registered}</td>
            </tr>

        )
    })
    

    return(
        <table className="users">
            <tr className='row'>
                <th>Passenger_ID</th>
                <th>Passenger_Name</th>
                <th>Passport_Number</th>
                <th>DOB</th>
                <th>Age</th>
                <th>Booking_Count</th>
                <th>Passenger_category</th>
                <th>Username</th>
                <th>Password</th>
                <th>is_registered</th>
            </tr>
            {ele}
        </table>
    )
}