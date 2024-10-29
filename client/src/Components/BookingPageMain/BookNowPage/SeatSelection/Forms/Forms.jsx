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
import './Forms.css';
function BookingForm() {
  const location = useLocation();
  const { selectedSeats } = location.state || {};
  const [passengers, setPassengers] = useState([]);

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
    };
    setPassengers(updatedPassengers);
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
                      handlePassengerChange(
                        index,
                        "passportNumber",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <div className="addpasss"><Button type="submit" className="addpa" variant="contained" color="primary" halfWidth  >
                        Add
                    </Button></div>
                
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button type="submit"  variant="contained" color="primary" halfWidth  >
                        Confirm Booking
                    </Button>
    </Box>
  );
}

export default BookingForm;
