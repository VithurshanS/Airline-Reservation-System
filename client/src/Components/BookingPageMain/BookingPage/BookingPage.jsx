import React, { useState, useEffect } from 'react';
import './BookingPage.css';
import TextField from '@mui/material/TextField';
import Carosoul from './Carosoul/Carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookingPage() {
  const [searchQuery, setSearchQuery] = useState({
    from: '',
    to: '',
    departureDate: '',
    passengers: 1,
  });

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  // Fetch schedules from backend using Axios
  useEffect(() => {
    axios.get('http://localhost:3067/getscheduleallwithaddress')
      .then(response => {
        if (response.data.message === 'Successfully retrieved schedules.') {
          const schedules = response.data.results;
          const formattedFlights = schedules.map(schedule => ({
            id: schedule.Schedule_ID,
            routeId: schedule.Route_ID,
            planeId: schedule.Plane_ID,
            departureTime: new Date(schedule.Departure_Time).toLocaleString(),
            arrivalTime: new Date(schedule.Arrival_Time).toLocaleString(),
            economyFare: schedule.Economy_Fare,
            businessFare: schedule.Business_Fare,
            platinumFare: schedule.Platinum_Fare,
            dep_airport: schedule.dep_airport,
            arr_airport: schedule.arr_airport,
            dep_city: schedule.dep_city,
            arr_city: schedule.arr_city,
          }));
          setFlights(formattedFlights);
        }
      })
      .catch(error => {
        console.error('Error fetching flight schedules:', error);
      });
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const results = flights.filter(
      (flight) =>
        flight.departureTime.includes(searchQuery.departureDate)
    );
    setFilteredFlights(results);
  };

  return (
    <div className="booking-page">
      <header className="bookingheader">
        <h1 className='bookingh1'>Airline Booking</h1>
      </header>

      <section className="heroo">
        <Carosoul />
        <div className="overlay">
          <h1 className='overlayh1'>Book Your Flight Today!</h1>
          <form onSubmit={handleSearch} className="search-form">
            <label className='label1'>
              <h2 className="h2tags">From:</h2>
              <TextField
                className='textfield'
                placeholder="Enter departure city"
                variant="filled"
                value={searchQuery.from}
                onChange={(e) => setSearchQuery({ ...searchQuery, from: e.target.value })}
              />
            </label>
            <label>
              <h2 className="h2tags">To:</h2>
              <TextField
                className='textfield'
                placeholder="Enter destination city"
                variant="filled"
                value={searchQuery.to}
                onChange={(e) => setSearchQuery({ ...searchQuery, to: e.target.value })}
              />
            </label>
            <label>
              <h2 className="h2tags">Departure Date:</h2>
              <TextField
                className='textfield'
                type="date"
                variant="filled"
                value={searchQuery.departureDate}
                onChange={(e) => setSearchQuery({ ...searchQuery, departureDate: e.target.value })}
              />
            </label>
            <label>
              <h2 className="h2tags">Passengers:</h2>
              <TextField
                className='textfield'
                type="number"
                variant="filled"
                value={searchQuery.passengers}
                onChange={(e) => setSearchQuery({ ...searchQuery, passengers: e.target.value })}
                min="1"
                max="10"
              />
            </label>
            <button type="submit" className="search-button">
              Search Flights
            </button>
          </form>
        </div>
      </section>

      <section className="flights">
        <h2>Available Flights</h2>
        {filteredFlights.length > 0 ? (
          <ul>
            {filteredFlights.map((flight) => (
              <li key={flight.id} className="flight-item">
<h3>From : {flight.dep_city} &nbsp;&nbsp;&nbsp; To : &nbsp; {flight.arr_city}</h3>

                <h3>
                  Plane {flight.planeId} - Departure: {flight.departureTime} to Arrival: {flight.arrivalTime}
                </h3>
                
                <p>
                  {/* Departure City: {flight.dep_city} <br />
                  Arrival City: {flight.arr_city} <br /> */}
                  Economy Fare: ${flight.economyFare}<br />
                  Business Fare: ${flight.businessFare}<br />
                  Platinum Fare: ${flight.platinumFare}
                </p>
                <Link
                  to={{
                    pathname: '/booknow'
                  }}
                  state={{
                    scheduleId: flight.id,
                    economyFare: flight.economyFare,
                    businessFare: flight.businessFare,
                    platinumFare: flight.platinumFare,
                    dep_city: flight.dep_city,
                    arr_city: flight.arr_city
                  }}>
                  <button className="search-button">Book Now</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights available matching your search criteria.</p>
        )}
      </section>

      <section className="booking-summary">
        <h2>Booking Summary</h2>
        <p>
          From: {searchQuery.from}<br />
          To: {searchQuery.to}<br />
          Departure Date: {searchQuery.departureDate}<br />
          Passengers: {searchQuery.passengers}
        </p>
      </section>
    </div>
  );
}

export default BookingPage;
