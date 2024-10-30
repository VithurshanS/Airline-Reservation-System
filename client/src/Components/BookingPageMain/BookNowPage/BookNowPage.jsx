import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./BookNowPage.css";
import SeatSelection from "./SeatSelection/SeatSelection";
import axios from "axios";
import { useLocation } from "react-router-dom";

// const axios = require('axios');
// import ParallaxFlight from './ParallaxFlight/ParallaxFlight';
// import image5 from './../../../assets/Booknowimages/image 5.jpg'
// import image6 from './../../../assets/Booknowimages/image 6.jpg'
// import image7 from './../../../assets/Booknowimages/image 7.jpg'
// import NavBar from '../NavBar/NavBar';

function BookNowPage() {
  const Navigate = useNavigate();
  const location = useLocation();
  const { scheduleId, economyFare, businessFare, platinumFare,dep_city,arr_city } =
    location.state || {};
  const [availableSeats, setAvailableSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [economySeatStart, setEconomySeatStart] = useState(0);
  const [businessSeatStart, setBusinessSeatStart] = useState(0);
  const [platinumSeatStart, setPlatinumSeatStart] = useState(0);
  // console.log(totalSeats);
  // console.log(economySeatStart);
  // console.log(businessSeatStart);
  // console.log(platinumSeatStart);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([
    { name: "", dob: "", gender: "", passportNumber: "" },
  ]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleAddPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", dob: "", gender: "", passportNumber: "" },
    ]);
  };

  const handlePassengerChange = (index, field, value) => {
    setPassengers(
      passengers.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
  };
  console.log("economy", Math.floor((businessSeatStart - 1) / 9));
  console.log(
    "business",
    Math.floor((platinumSeatStart - businessSeatStart) / 9)
  );
  console.log("plantinum", Math.floor((totalSeats - platinumSeatStart) / 9));

  useEffect(() => {
    console.log("Schedule ID:", { scheduleId });
    console.log({ availableSeats });
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    axios
      .get(`http://localhost:3067/getavailableseats/${scheduleId}`)
      .then((response) => {
        console.log("Available seats:", response.data.results);
        setAvailableSeats(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching available seats:", error);
      });
  }, [scheduleId]);

  
  useEffect(() => {
    axios
      .get(`http://localhost:3067/getseatdetails/${scheduleId}`)
      .then((response) => {
        const seatDetails = response.data.results[0]?.[0];
        console.log("getseatsss", response.data.results);
        if (seatDetails) {
          setTotalSeats(seatDetails.Total_seats);
          setEconomySeatStart(seatDetails.Economy_seat_start_no);
          setBusinessSeatStart(seatDetails.Business_seat_start_no);
          setPlatinumSeatStart(seatDetails.Platinum_seat_start_no);
        }
      })
      .catch((error) => {
        console.error("Error fetching seat details:", error);
      });
  }, [scheduleId]);

  const seatConfig = totalSeats
    ? {
        economyRows: Math.floor((businessSeatStart - 1) / 9),
        businessRows: Math.floor((platinumSeatStart - businessSeatStart) / 9),
        platinumRows: Math.floor((totalSeats - platinumSeatStart) / 9),
        seatsPerRow: 9,
      }
    : null;

  return (
    <>
      <div className="flightdetails">
        <h1>Flight Schedule</h1>
        <div className="flight-info">
          <div className="info-item">
            <label>Schedule ID:</label>
            <span>{scheduleId}</span>
          </div>
          <div className="info-item">
            <label>Departure:</label>
            <span>{dep_city}</span>
          </div>
          <div className="info-item">
            <label>Arrival:</label>
            <span>{arr_city}</span>
          </div>
          <div className="info-item">
            <label>Economy Fees:</label>
            <span>{economyFare}</span>
          </div>
          <div className="info-item">
            <label>Platinum Class Fees:</label>
            <span>{platinumFare}</span>
          </div>
          <div className="info-item">
            <label>Business Class Fees:</label>
            <span>{businessFare}</span>
          </div>
        </div>
        <button
        className="confirm_book"
        onClick={() => Navigate("/forms", { state: { selectedSeats } })}
      >
        Confirm Booking
      </button>
      </div>
      
      
      {seatConfig && (
        <Box sx={{ mt: 4 }}>
          <SeatSelection
            seatConfig={seatConfig}
            availableSeats={availableSeats}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </Box>
      )}
     

      
    </>
  );
}

export default BookNowPage;
