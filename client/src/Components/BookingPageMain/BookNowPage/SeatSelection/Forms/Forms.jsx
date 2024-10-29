import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './Forms.css';

function BookingForm() {
  const location = useLocation();
  const { selectedSeats } = location.state || {};
  const [passengers, setPassengers] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Initialize passengers based on selectedSeats length
    setPassengers(
      Array(selectedSeats?.length || 0).fill({
        name: "",
        dob: "",
        gender: "",
        passportNumber: "",
        seatNumber: "",
      })
    );
  }, [selectedSeats]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
      seatNumber: selectedSeats ? selectedSeats[index] : "",
    };
    setPassengers(updatedPassengers);
  };

  const handlePassengerdata = async (index) => {
    const passenger = passengers[index];
    if (!passenger.name || !passenger.dob || !passenger.gender || !passenger.passportNumber) {
      setResult("Please fill all fields before adding.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3067/addguest', {
        Passenger_Name: passenger.name,
        Passport_Number: passenger.passportNumber,
        DOB: passenger.dob,
        Gender: passenger.gender,
        Seat_Number: passenger.seatNumber,
      });
      
      setResult(response.data.message); // Display success message from backend
      console.log(`Passenger ${index + 1} added:`, response.data.message);
    } catch (error) {
      console.error('Error during post request:', error);
      setResult("Failed to add passenger. Please try again.");
    }
  };

  return (
    <Box
      className="book-now-page"
      sx={{ p: 4, backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        Book Now
      </Typography>

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
                    label="Seat Number"
                    variant="outlined"
                    fullWidth
                    value={selectedSeats ? selectedSeats[index] : ""}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
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
                      handlePassengerChange(index, "passportNumber", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePassengerdata(index)}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography color="textSecondary" variant="body2" sx={{ mt: 2 }}>
        {result}
      </Typography>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Confirm Booking
      </Button>
    </Box>
  );
}

export default BookingForm;
