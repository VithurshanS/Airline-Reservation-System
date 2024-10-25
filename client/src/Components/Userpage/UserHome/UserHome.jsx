//import React from 'react';
import { Grid, Paper, Typography, Button, Card, CardContent } from '@mui/material';

const UserHomePage = () => {
  const userName = "John Doe"; // Replace with dynamic user name
  const upcomingFlight = {
    flightNumber: 'BA123',
    destination: 'LAX',
    date: '2024-10-15',
  };
  const frequentFlyerStatus = {
    status: 'Frequent Flyer',
    bookingsNeeded: 2,
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={4} style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>Welcome Back, {userName}!</Typography>

          {/* Flight Summary */}
          <Card elevation={2} style={{ marginBottom: '1rem', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6">Upcoming Flight:</Typography>
              <Typography variant="body1">
                Flight {upcomingFlight.flightNumber} to {upcomingFlight.destination} on {upcomingFlight.date}
              </Typography>
            </CardContent>
          </Card>

          {/* Frequent Flyer Status */}
          <Card elevation={2} style={{ marginBottom: '1rem', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h6">Frequent Flyer Status:</Typography>
              <Typography variant="body1">
                Status: {frequentFlyerStatus.status} - You need {frequentFlyerStatus.bookingsNeeded} more booking{frequentFlyerStatus.bookingsNeeded > 1 ? 's' : ''} to reach Gold status!
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" style={{ backgroundColor: '#64b5f6', color: '#fff', fontWeight: 'bold' }}>
                Book Now
              </Button>
            </Grid>
          </Grid>

          {/* Notifications & Alerts */}
          <Paper elevation={1} style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px' }}>
            <Typography variant="h6">Notifications & Alerts:</Typography>
            <Typography variant="body2">Flight BA123: Gate change to Gate 5</Typography>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserHomePage;
