// import React and required hooks
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Grid, Avatar } from '@mui/material';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userView, setUserView] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUserDetails(userData);

      // Fetch user view data from the backend
      axios.post("http://localhost:3067/getviewof", { user_id: userData.User_ID })
        .then((response) => {
          setUserView(response.data.userview);
        })
        .catch((error) => {
          console.error("Error fetching user view:", error);
        });
    }
  }, []);

  // If user details are not in local storage
  if (!userDetails) {
    return <Typography variant="h6">User not found in local storage.</Typography>;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '15px' }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Avatar style={{ width: '100px', height: '100px', backgroundColor: '#64b5f6' }}>
                {userDetails.First_name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6">{userDetails.First_name} {userDetails.Last_name}</Typography>
              <Typography variant="body1">Username: {userDetails.User_Name}</Typography>
              <Typography variant="body1">Email: {userDetails.Email}</Typography>
              <Typography variant="body1">Age: {userDetails.Age}</Typography>
              <Typography variant="body1">Gender: {userDetails.Gender}</Typography>
              <Typography variant="body1">Role: {userDetails.Role}</Typography>
            </Grid>
          </Grid>

          {userView ? (
            <>
              <Typography variant="h5" style={{ marginTop: '2rem' }}>Current Level</Typography>
              <Typography variant="body1">Category: {userView.current_category_type}</Typography>
              <Typography variant="body1">Bookings Count: {userView.Bookings_count}</Typography>
              <Typography variant="body1">Next Level: {userView.next_level}</Typography>
              <Typography variant="body1">
                Required Bookings for {userView.next_level}: {userView.RBC}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '1rem' }}>
              Loading user level information...
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
