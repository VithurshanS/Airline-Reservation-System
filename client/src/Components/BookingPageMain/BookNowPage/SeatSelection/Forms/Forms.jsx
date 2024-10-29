import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("user") || "{}");
  const userid = userdetails.User_ID;
  const location = useLocation();
  const { selectedSeats } = location.state || {};
  const [passengers, setPassengers] = useState([]);
  const [resultMessages, setResultMessages] = useState([]); // Array to store result for each passenger

  useEffect(() => {
    setPassengers(
      Array(selectedSeats?.length || 0).fill({
        name: "",
        dob: "",
        gender: "",
        passportNumber: "",
        seatNumber: "",
      })
    );
    setResultMessages(Array(selectedSeats?.length || 0).fill("")); // Initialize result messages for each passenger
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

  const handlePassengerData = async (index) => {
    const passenger = passengers[index];
    const selectedSeat = selectedSeats[index];

    if (!passenger.name || !passenger.dob || !passenger.gender || !passenger.passportNumber) {
      updateResultMessage(index, "Please fill all fields before adding.");
      return;
    }

    try {
      // First call to add guest
      const guestResponse = await axios.post('http://localhost:3067/addguest', {
        Passenger_Name: passenger.name,
        Passport_Number: passenger.passportNumber,
        DOB: passenger.dob,
        Gender: passenger.gender,
        Seat_Number: selectedSeat.Seat_number,
      });

      const passengerID = guestResponse.data.result;
      console.log("passengerid",passengerID);

      // Second call to add booking
      const bookingResponse = await axios.post('http://localhost:3067/addbooking', {
        Passenger_ID: passengerID,
        User_ID: userid,
        Seat_ID: selectedSeat.Seat_ID,
      });

      updateResultMessage(index, bookingResponse.data.message);
      
      console.log(`Booking for Passenger ${index + 1} added:`, bookingResponse.data.message);
    } catch (error) {
      console.error('Error during post request:', error);
      updateResultMessage(index, "Failed to add booking. Please try again.");
    }
  };

  const updateResultMessage = (index, message) => {
    const updatedMessages = [...resultMessages];
    updatedMessages[index] = message;
    setResultMessages(updatedMessages);
  };
  const handleConfirmBooking = async () => {
    try {
      for (const seat of selectedSeats) {
        const response = await axios.post("http://localhost:3067/bookseat", {
          seat: seat.Seat_ID,
        });
        console.log("Seat booking response:", response.data);
      }
    } catch (error) {
      console.error("Error booking seats:", error);
    }
    alert("Booking succesful");
    navigate('/Home');
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
                    value={selectedSeats ? selectedSeats[index].Seat_number : ""} // Display Seat_number
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
                    onClick={() => handlePassengerData(index)}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="textSecondary" variant="body2">
                    {resultMessages[index]}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </Button>
    </Box>
  );
}

export default BookingForm;
