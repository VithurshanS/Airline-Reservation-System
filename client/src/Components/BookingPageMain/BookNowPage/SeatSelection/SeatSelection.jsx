import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './SeatSelection.css';

const totalRows = 14; // Total number of rows
const seatsPerRow = 9;

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeat = (seatNumber, rowType) => {
    const isSelected = selectedSeats.includes(seatNumber);
    const seatColor = rowType === 'Platinum' ? '#1976d2' : '#64b5f6';  // Darker blue for Platinum, lighter blue for Economy

    return (
      <Button
        key={seatNumber}
        variant={isSelected ? 'contained' : 'outlined'}
        sx={{
          minWidth: '60px',
          minHeight: '40px',
          color: isSelected ? '#fff' : '#000',
          backgroundColor: isSelected ? seatColor : '#e0e0e0',
          '&:hover': {
            backgroundColor: isSelected ? '#1565c0' : '#bdbdbd',
          },
        }}
        onClick={() => handleSeatClick(seatNumber)}
      >
        {seatNumber}
      </Button>
    );
  };

  const generateSeatNumber = (rowIndex, seatIndex) => {
    return rowIndex * seatsPerRow + seatIndex + 1; // Generates seat numbers starting from 1
  };

  return (
    <Box className="seat-selection" sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>Select Your Seat</Typography>

      {/* First 4 rows - Platinum Class */}
      <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>Platinum Class</Typography>
      {[...Array(4)].map((_, rowIndex) => (
        <Grid container spacing={1} key={rowIndex} sx={{ mb: 1 }}>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex}>
                  {renderSeat(generateSeatNumber(rowIndex, seatIndex), 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 3}>
                  {renderSeat(generateSeatNumber(rowIndex, seatIndex + 3), 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 6}>
                  {renderSeat(generateSeatNumber(rowIndex, seatIndex + 6), 'Platinum')}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}

      {/* Space between Platinum and Economy Class */}
      <Box sx={{ height: '20px' }} />

      {/* Next 6 rows - Economy Class */}
      <Typography variant="h6" sx={{ mb: 1, color: '#64b5f6' }}>Economy Class</Typography>
      {[...Array(6)].map((_, rowIndex) => (
        <Grid container spacing={1} key={rowIndex + 4} sx={{ mb: 1 }}>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex}>
                  {renderSeat(generateSeatNumber(rowIndex + 4, seatIndex), 'Economy')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 3}>
                  {renderSeat(generateSeatNumber(rowIndex + 4, seatIndex + 3), 'Economy')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 6}>
                  {renderSeat(generateSeatNumber(rowIndex + 4, seatIndex + 6), 'Economy')}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}

      {/* Space between Economy and Business Class */}
      <Box sx={{ height: '20px' }} />

      {/* Last 4 rows - Business Class */}
      <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>Business Class</Typography>
      {[...Array(4)].map((_, rowIndex) => (
        <Grid container spacing={1} key={rowIndex + 10} sx={{ mb: 1 }}>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex}>
                  {renderSeat(generateSeatNumber(rowIndex + 10, seatIndex), 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 3}>
                  {renderSeat(generateSeatNumber(rowIndex + 10, seatIndex + 3), 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 6}>
                  {renderSeat(generateSeatNumber(rowIndex + 10, seatIndex + 6), 'Platinum')}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          Selected Seats: {selectedSeats.join(', ') || 'None'}
        </Typography>
      </Box>
    </Box>
  );
}

export default SeatSelection;
