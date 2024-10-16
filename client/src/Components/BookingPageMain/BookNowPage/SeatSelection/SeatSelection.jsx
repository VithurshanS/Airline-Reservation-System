import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './SeatSelection.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']; // Added 3 more rows for Business class
const seatsPerRow = 12;

function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeat = (row, seatNumber, rowType) => {
    const seat = `${row}${seatNumber}`;
    const isSelected = selectedSeats.includes(seat);
    const seatColor = rowType === 'Platinum' ? '#1976d2' : '#64b5f6';  // Darker blue for Platinum, lighter blue for Economy

    return (
      <Button
        key={seat}
        variant={isSelected ? 'contained' : 'outlined'}
        sx={{
          minWidth: '40px',
          minHeight: '40px',
          color: isSelected ? '#fff' : '#000',
          backgroundColor: isSelected ? seatColor : '#e0e0e0',
          '&:hover': {
            backgroundColor: isSelected ? '#1565c0' : '#bdbdbd',
          },
        }}
        onClick={() => handleSeatClick(seat)}
      >
        {seatNumber}
      </Button>
    );
  };

  return (
    <Box className="seat-selection" sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#1976d2' }}>Select Your Seat</Typography>

      {/* First 4 rows - Platinum Class */}
      <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>Platinum Class</Typography>
      {rows.slice(0, 4).map((row) => (
        <Grid container spacing={1} key={row} sx={{ mb: 1 }}>
          <Grid item xs={1}>
            <Typography variant="body1">{row}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber}>
                  {renderSeat(row, seatNumber + 1, 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber + 3}>
                  {renderSeat(row, seatNumber + 4, 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber + 6}>
                  {renderSeat(row, seatNumber + 7, 'Platinum')}
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
      {rows.slice(4, 10).map((row) => (
        <Grid container spacing={1} key={row} sx={{ mb: 1 }}>
          <Grid item xs={1}>
            <Typography variant="body1">{row}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber}>
                  {renderSeat(row, seatNumber + 1, 'Economy')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber + 3}>
                  {renderSeat(row, seatNumber + 4, 'Economy')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber + 6}>
                  {renderSeat(row, seatNumber + 7, 'Economy')}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}

      {/* Space between Economy and Business Class */}
      <Box sx={{ height: '20px' }} />

      {/* Last 7 rows - Business Class */}
      <Typography variant="h6" sx={{ mb: 1, color: '#1976d2' }}>Business Class</Typography>
      {rows.slice(10, 14).map((row) => (
        <Grid container spacing={1} key={row} sx={{ mb: 1 }}>
          <Grid item xs={1}>
            <Typography variant="body1">{row}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber}>
                  {renderSeat(row, seatNumber + 1, 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber + 3}>
                  {renderSeat(row, seatNumber + 4, 'Platinum')}
                </Grid>
              ))}
              <Grid item>
                <Box sx={{ minWidth: '20px' }} />
              </Grid>
              {[...Array(3)].map((_, seatNumber) => (
                <Grid item key={seatNumber + 6}>
                  {renderSeat(row, seatNumber + 7, 'Platinum')}
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
