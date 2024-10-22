import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      home pagivithurshan
      {/* <button className="btn-booknow" >Book Now </button> */}
      <Link to='/bookingpage' >
                <button className="bookingpage-button" >
                  TO Book
                  </button>
                  </Link>
    </div>
  )
}

export default Home;


