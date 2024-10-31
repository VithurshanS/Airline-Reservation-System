import { useState } from 'react';
import { Grid, Paper, Typography, Avatar, LinearProgress, Collapse, AppBar, Toolbar, IconButton, List, ListItem, ListItemText } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
//import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
//import './BookingInfo';  Assuming we add custom styles in a separate CSS file

// Sample hardcoded user and booking data
const user = {
  username: 'john_',
  category: 'Regular', // Can be 'Regular', 'Frequent', or 'Gold'
  bookings: 3,
  offer: 5, // Offer percentage
  //streak: 2,  Consecutive bookings in months
};

const bookingsHistory = [
  { flightNumber: 'BA123', departure: 'JFK', arrival: 'LAX', date: '2024-10-15', time: '08:00 AM' },
  { flightNumber: 'BA456', departure: 'LAX', arrival: 'SFO', date: '2024-09-22', time: '10:00 AM' },
  { flightNumber: 'BA789', departure: 'SFO', arrival: 'SEA', date: '2024-08-18', time: '12:00 PM' },
  { flightNumber: 'BA321', departure: 'ORD', arrival: 'ATL', date: '2024-11-01', time: '05:30 PM' },
  { flightNumber: 'BA654', departure: 'DFW', arrival: 'MIA', date: '2024-11-10', time: '02:15 PM' },
  { flightNumber: 'BA987', departure: 'BOS', arrival: 'PHL', date: '2024-10-25', time: '07:45 AM' },
  { flightNumber: 'BA159', departure: 'SEA', arrival: 'LAX', date: '2024-11-15', time: '03:30 PM' },
  { flightNumber: 'BA753', departure: 'LAX', arrival: 'JFK', date: '2024-10-30', time: '09:00 PM' },
  { flightNumber: 'BA852', departure: 'SFO', arrival: 'ORD', date: '2024-11-20', time: '11:00 AM' },
  { flightNumber: 'BA456', departure: 'MIA', arrival: 'LAX', date: '2024-11-05', time: '04:00 PM' },
];

const BookingInfo = () => {
  const [open, setOpen] = useState(false); // State to toggle the collapse for bookings

  const handleToggle = () => {
    setOpen(!open); // Toggle collapse
  };

  const frequentCategory = 5;
  const goldCategory = 10;
  const remainingToFrequent = frequentCategory - user.bookings;
  const remainingToGold = goldCategory - user.bookings;

  const isFrequentAchieved = remainingToFrequent <= 0;
  const isGoldAchieved = remainingToGold <= 0;

  const getProgressMarkerStyle = (value) => ({
    position: 'absolute',
    left: `${value}%`,
    top: '-8px',
    transform: 'translateX(-50%)',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: '#64b5f6', // Adjust color based on status
    border: '2px solid white',
  });

  const progressFrequent = isFrequentAchieved ? 100 : (user.bookings / frequentCategory) * 100;
  const progressGold = isGoldAchieved ? 100 : (user.bookings / goldCategory) * 100;

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f4ff' }}>
      {/* Top AppBar */}
      <AppBar position="static" color="primary" style={{ marginBottom: '2rem' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Booking Info
          </Typography>
          <Avatar style={{ backgroundColor: user.category === 'Gold' ? '#ffd700' : user.category === 'Frequent' ? '#64b5f6' : '#e0e0e0' }}>
            <FlightTakeoffIcon />
          </Avatar>
        </Toolbar>
      </AppBar>

      <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
          {/* Header */}
          <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant="h5">Welcome, {user.username}</Typography>
            <Avatar style={{ backgroundColor: user.category === 'Gold' ? '#ffd700' : user.category === 'Frequent' ? '#64b5f6' : '#e0e0e0' }}>
              <FlightTakeoffIcon />
            </Avatar>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: user.category === 'Gold' ? '#ffd700' : '#64b5f6' }}>
              {user.category} Flyer
            </Typography>
          </Grid>

          {/* Booking Progress Bars */}
          <Grid container spacing={3} style={{ marginTop: '2rem' }}>
            <Grid item xs={12} style={{ position: 'relative' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Progress to Frequent Flyer (5 bookings)</Typography>
              <div style={{ position: 'relative' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progressFrequent} 
                  style={{ height: '10px', borderRadius: '5px' }} 
                />
                <div style={getProgressMarkerStyle(progressFrequent)}></div>
              </div>
              <Typography variant="caption">{isFrequentAchieved ? 'Frequent Flyer status achieved' : `${user.bookings}/5 bookings for Frequent Flyer`}</Typography>
            </Grid>

            <Grid item xs={12} style={{ position: 'relative' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Progress to Gold (10 bookings)</Typography>
              <div style={{ position: 'relative' }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progressGold} 
                  style={{ height: '10px', borderRadius: '5px' }} 
                />
                <div style={getProgressMarkerStyle(progressGold)}></div>
              </div>
              <Typography variant="caption">{isGoldAchieved ? 'Gold Flyer status achieved' : `${user.bookings}/10 bookings for Gold`}</Typography>
            </Grid>
          </Grid>

          {/* Display the number of bookings required to reach the next category */}
          <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
            {isGoldAchieved ? (
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Congratulations🎊 <br />
                You are a Gold Flyer✨
              </Typography>
            ) : isFrequentAchieved ? (
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Congratulations🎊 <br />
                You have reached Frequent Flyer status✨ <br /> You need {remainingToGold} more booking{remainingToGold > 1 ? 's' : ''} to reach Gold status. Hurry up and make your bookings!
              </Typography>
            ) : (
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                You need {remainingToFrequent} more booking{remainingToFrequent > 1 ? 's' : ''} to reach Frequent Flyer status and {remainingToGold} more to reach Gold. <br />Hurry up and make your bookings!
              </Typography>
            )}
          </Grid>

          {/* Previous Bookings Button */}
          <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
            <Button variant="outlined" color="primary" onClick={handleToggle}>
              {open ? 'Hide Previous Bookings' : 'View Previous Bookings'}
            </Button>
          </Grid>

          {/* Booking Details Slide Down (Collapse) */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
              {bookingsHistory.map((booking, index) => (
                <ListItem key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <ListItemText
                    primary={`Flight Number: ${booking.flightNumber}`}
                    secondary={`Departure: ${booking.departure}, Arrival: ${booking.arrival}, Date: ${booking.date}, Time: ${booking.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Streak Widget
          <Grid item xs={12} style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Booking Streak</Typography>
            <Typography>You’ve booked {user.streak} months in a row! Keep up the streak for exclusive rewards!</Typography>
            <AirplaneTicketIcon style={{ fontSize: '40px', color: '#64b5f6' }} />
          </Grid> */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BookingInfo;
