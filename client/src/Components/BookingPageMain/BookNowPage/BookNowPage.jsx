import React, { useState } from 'react';
import { Box, Button, Typography, TextField, MenuItem, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './BookNowPage.css';
import SeatSelection from './SeatSelection/SeatSelection';
// import NavBar from '../NavBar/NavBar';

function BookNowPage() {
  const [selectedClass, setSelectedClass] = useState('Economy');
  const [passengers, setPassengers] = useState([{ name: '', age: '', seat: '' }]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', seat: '' }]);
  };

  const handlePassengerChange = (index, field, value) => {
    setPassengers(
      passengers.map((passenger, i) => (i === index ? { ...passenger, [field]: value } : passenger))
    );
  };

  return (
    <Box className="book-now-page" sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
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
            <Box className="passenger" sx={{ p: 2, backgroundColor: '#fff', borderRadius: 1, boxShadow: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Passenger {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Seat"
                    variant="outlined"
                    fullWidth
                    value={passenger.seat}
                    onChange={(e) => handlePassengerChange(index, 'seat', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <IconButton color="primary" onClick={handleAddPassenger}>
          <AddIcon /> Add Passenger
        </IconButton>
      </Box>
      <Box sx={{ mt: 4 }}>
        <SeatSelection />
      </Box>

      <div className="animation-container">
        {/* Add animation code here */}
      </div>
    </Box>
  );
}

export default BookNowPage;
