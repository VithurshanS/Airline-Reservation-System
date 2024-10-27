import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './SeatSelection.css';

const SeatSelection = ({ seatConfig, availableSeats }) => {
  const { economyRows, businessRows, platinumRows, seatsPerRow } = seatConfig;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    // If the seat is red (unavailable), prevent selection
    const isAvailable = availableSeats.some((s) => s.Seat_number === seat);
    if (!isAvailable) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeat = (seatNumber, rowType) => {
    const isSelected = selectedSeats.includes(seatNumber);
    const isAvailable = availableSeats.some((seat) => seat.Seat_number === seatNumber);
    
    const seatColor = isSelected
      ? 'yellow'
      : isAvailable
      ? (rowType === 'Platinum' ? '#1976d2' : rowType === 'Business' ? '#64b5f6' : '#8bc34a')
      : 'red';

    return (
      <Button
        key={seatNumber}
        variant={isSelected ? 'contained' : 'outlined'}
        disabled={!isAvailable} // Disable the button if the seat is not available (red)
        sx={{
          minWidth: '60px',
          minHeight: '40px',
          color: isSelected ? '#fff' : '#000',
          backgroundColor: seatColor,
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

  const generateSeatNumber = (rowIndex, seatIndex, startingSeatNumber) => {
    return startingSeatNumber + rowIndex * seatsPerRow + seatIndex; // Start seat numbers from the given starting number
  };

  const renderRows = (classType, rowCount, startingSeatNumber) => (
    <>
      <Typography variant="h6" sx={{ mb: 1, color: classType === 'Platinum' ? '#1976d2' : classType === 'Business' ? '#64b5f6' : '#8bc34a' }}>
        {classType} Class
      </Typography>
      {[...Array(rowCount)].map((_, rowIndex) => (
        <Grid container spacing={1} key={rowIndex} sx={{ mb: 1 }}>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex}>
                  {renderSeat(generateSeatNumber(rowIndex, seatIndex, startingSeatNumber), classType)}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 3}>
                  {renderSeat(generateSeatNumber(rowIndex, seatIndex + 3, startingSeatNumber), classType)}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatIndex) => (
                <Grid item key={seatIndex + 6}>
                  {renderSeat(generateSeatNumber(rowIndex, seatIndex + 6, startingSeatNumber), classType)}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );

  // Calculate starting seat numbers for each class
  const platinumSeats = platinumRows * seatsPerRow;
  const businessStartingSeat = platinumSeats + 1;
  const businessSeats = businessRows * seatsPerRow;
  const economyStartingSeat = businessStartingSeat + businessSeats;

  return (
    <Box className="seat-selection" sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>Select Your Seat</Typography>
      
      {renderRows('Economy', economyRows, 1)}
      <Box sx={{ height: '20px' }} />
      {renderRows('Business', businessRows, businessStartingSeat)}
      <Box sx={{ height: '20px' }} />
      {renderRows('Platinum', platinumRows, economyStartingSeat)}

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="textSecondary">
          Selected Seats: {selectedSeats.join(', ') || 'None'}
        </Typography>
      </Box>
    </Box>
  );
};

export default SeatSelection;
