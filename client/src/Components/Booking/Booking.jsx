import React from 'react'
import { useNavigate } from 'react-router-dom';

const Booking = () => {

  const Navigate = useNavigate();
  return (
    <div>
      
      
      <button onClick={() => Navigate("/ScheduleEdit")}>
          Schedule edditing
        </button>
      
      </div>

    
  )
}

export default Booking