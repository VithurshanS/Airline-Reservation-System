import React, { useState } from 'react';
import './BookingPage.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Carosoul from './Carosoul/Carousel';
import { Link } from 'react-router-dom';

function BookingPage() {
  const [searchQuery, setSearchQuery] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
  });

  const [flights, setFlights] = useState([
    {
      id: 1,
      airline: 'Airline 1',
      departure: 'New York (JFK)',
      arrival: 'Los Angeles (LAX)',
      departureDate: '2024-03-15',
      returnDate: '2024-03-20',
      price: 200,
    },
    {
      id: 2,
      airline: 'Airline 2',
      departure: 'New York (JFK)',
      arrival: 'Chicago (ORD)',
      departureDate: '2024-03-15',
      returnDate: '2024-03-20',
      price: 150,
    },
    {
      id: 3,
      airline: 'Airline 3',
      departure: 'New York (JFK)',
      arrival: 'Los Angeles (LAX)',
      departureDate: '2024-03-15',
      returnDate: '2024-03-20',
      price: 150,
    },
  ]);

  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const results = flights.filter(
      (flight) =>
        flight.departure.toLowerCase().includes(searchQuery.from.toLowerCase()) &&
        flight.arrival.toLowerCase().includes(searchQuery.to.toLowerCase()) &&
        flight.departureDate === searchQuery.departureDate
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
                clads
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
                <h3>
                  {flight.airline} - {flight.departure} to {flight.arrival}
                </h3>
                <p>
                  Departure Date: {flight.departureDate}
                  <br />
                  Price: ${flight.price}
                </p>
                <Link to='/booknow' >
                <button className="search-button" >
                  Book Now
                  </button>
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
          From: {searchQuery.from}
          <br />
          To: {searchQuery.to}
          <br />
          Departure Date: {searchQuery.departureDate}
          <br />
          Return Date: {searchQuery.returnDate}
          <br />
          Passengers: {searchQuery.passengers}
        </p>
      </section>
    </div>
  );
}

export default BookingPage;
