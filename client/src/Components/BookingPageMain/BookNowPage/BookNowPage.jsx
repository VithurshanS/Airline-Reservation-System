import React, { useEffect, useState } from "react";
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
  const location = useLocation();
  const { scheduleId } = location.state || {};
  const [selectedClass, setSelectedClass] = useState("Economy");
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

  useEffect(() => {
    console.log("hi ");
    console.log("Schedule ID:", { scheduleId });

    axios
      .get(`http://localhost:3066/getavailableseats/${scheduleId}`)
      .then((response) => {
        console.log("Available seats:", response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching available seats:", error);
      });
  }, []);

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
            <span>New York</span>
          </div>
          <div className="info-item">
            <label>Arrival:</label>
            <span>London</span>
          </div>
          <div className="info-item">
            <label>Economy Fees:</label>
            <span>$100</span>
          </div>
          <div className="info-item">
            <label>Platinum Class Fees:</label>
            <span>$200</span>
          </div>
          <div className="info-item">
            <label>Business Class Fees:</label>
            <span>$300</span>
          </div>
        </div>
      </div>
      {/* <div className="parallax">
    <ParallaxFlight />
    </div> */}

      <Box
        className="book-now-page"
        sx={{ p: 4, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}
      >
        {/* <NavBar/> */}

        <Typography variant="h4" gutterBottom>
          Book Now
        </Typography>

        <Box className="class-selection" sx={{ mb: 3 }}>
          <Typography variant="h6">Select Class</Typography>
          <TextField
            select
            value={selectedClass}
            onChange={handleClassChange}
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Platinum">Platinum</MenuItem>
          </TextField>
        </Box>

        <Grid container spacing={2}>
          {passengers.map((passenger, index) => (
            <Grid item xs={12} key={index}>
              <Box
                className="passenger"
                sx={{
                  p: 2,
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Passenger {index + 1}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      placeholder="Name"
                      variant="outlined"
                      fullWidth
                      value={passenger.name}
                      onChange={(e) =>
                        handlePassengerChange(index, "name", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      placeholder="Date of Birth"
                      type="date"
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={passenger.dob}
                      onChange={(e) =>
                        handlePassengerChange(index, "dob", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label="Gender"
                      variant="outlined"
                      fullWidth
                      value={passenger.gender}
                      onChange={(e) =>
                        handlePassengerChange(index, "gender", e.target.value)
                      }
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      placeholder="Passport Number"
                      variant="outlined"
                      fullWidth
                      value={passenger.passportNumber}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "passportNumber",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <IconButton color="primary" onClick={handleAddPassenger}>
            <AddIcon /> Add Passenger
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <SeatSelection
            seatConfig={{
              platinumRows: 4,
              businessRows: 8,
              economyRows: 8,
              seatsPerRow: 9,
            }}
          />
        </Box>

        <div className="animation-container">
          {/* Add animation code here */}
        </div>
      </Box>
    </>
  );
}

export default BookNowPage;
