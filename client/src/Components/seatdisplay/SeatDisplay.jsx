import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SeatDisplay.css';

const SeatDisplay = ({ scheduleId }) => {
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState();

  useEffect(() => {
    // Fetch available, booked, and selected seats for the provided schedule ID
    const fetchSeats = async () => {
      try {
        // Fetch available seats
        const availableResponse = await axios.get(`http://localhost:3066/getavailableseats/415020d3-8d02-11ef-923f-c85acfdb72cc`);
        setAvailableSeats(availableResponse.data.results.map(seat => seat.Seat_number));

        // Fetch booked seats
        const bookedResponse = await axios.get(`http://localhost:3066/getbookedseats/415020d3-8d02-11ef-923f-c85acfdb72cc`);
        setBookedSeats(bookedResponse.data.results.map(seat => seat.Seat_number));

        // Fetch selected seats
        const selectedResponse = await axios.get(`http://localhost:3066/getselectedseats/415020d3-8d02-11ef-923f-c85acfdb72cc`);
        setSelectedSeats(selectedResponse.data.results.map(seat => seat.Seat_number));
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [scheduleId]);

  return (
    <div className="seat-display-container">
      <h3>Seat Lists</h3>

      {/* Available Seats */}
      <div className="seat-list">
        <h4>Available Seats</h4>
        {availableSeats.length > 0 ? (
          <ul>
            {availableSeats.map((seatNumber) => (
              <li key={seatNumber}>{seatNumber}</li>
            ))}
          </ul>
        ) : (
          <p>No available seats</p>
        )}
      </div>

      {/* Selected Seats */}
      <div className="seat-list">
        <h4>Selected Seats</h4>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seatNumber) => (
              <li key={seatNumber}>{seatNumber}</li>
            ))}
          </ul>
        ) : (
          <p>No selected seats</p>
        )}
      </div>

      {/* Booked Seats */}
      <div className="seat-list">
        <h4>Booked Seats</h4>
        {bookedSeats.length > 0 ? (
          <ul>
            {bookedSeats.map((seatNumber) => (
              <li key={seatNumber}>{seatNumber}</li>
            ))}
          </ul>
        ) : (
          <p>No booked seats</p>
        )}
      </div>
    </div>
  );
};

export default SeatDisplay;
