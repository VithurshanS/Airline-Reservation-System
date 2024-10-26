import { Grid, TextField, Paper, Avatar, Button, IconButton, Typography, Card, CardContent } from '@mui/material';
import { Edit, Lock, Person } from '@mui/icons-material';
import { useState } from 'react';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  backgroundColor: '#64b5f6',
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '8px',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#42a5f5',
  },
});

const ProfileContainer = styled(Paper)({
  padding: '2rem',
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
});

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: 'johnDoe123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    dob: '1990-01-01',
    age: 34,
    passportNumber: 'A1234567',
    gender: 'Male',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '70vh', backgroundColor: '#f0f4f8' }}>
      <Grid item xs={12} sm={10} md={10} lg={8}>
        <ProfileContainer elevation={4}>
          {/* User Info Rectangle */}
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <Avatar 
                style={{
                  backgroundColor: '#64b5f6',
                  width: 100,
                  height: 100,
                  margin: '0 auto',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Person style={{ fontSize: 60 }} />
              </Avatar>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" style={{ fontWeight: '600', fontFamily: 'Poppins, sans-serif' }}>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {userData.username}
              </Typography>
            </Grid>
          </Grid>
        </ProfileContainer>

        {/* User Details */}
        <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ marginTop: '2rem' }}>
          <Grid item xs={12}>
            <Card elevation={2} style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: '#fafafa' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      fullWidth
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Date of Birth"
                      fullWidth
                      name="dob"
                      type="date"
                      value={userData.dob}
                      onChange={handleInputChange}
                      InputLabelProps={{ shrink: true }}
                      disabled={!editMode}
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Age"
                      fullWidth
                      name="age"
                      value={userData.age}
                      onChange={handleInputChange}
                      disabled
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Passport Number"
                      fullWidth
                      name="passportNumber"
                      value={userData.passportNumber}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Gender"
                      fullWidth
                      name="gender"
                      value={userData.gender}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      InputProps={{ style: { backgroundColor: '#fff', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' } }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Edit and Lock buttons below the details */}
        <Grid container justifyContent="center" spacing={2} style={{ marginTop: '1rem' }}>
          <Grid item>
            {editMode ? (
              <CustomButton onClick={toggleEditMode}>
                Save
              </CustomButton>
            ) : (
              <IconButton
                color="primary"
                onClick={toggleEditMode}
                style={{ color: '#64b5f6' }}
              >
                <Edit />
              </IconButton>
            )}
          </Grid>
          <Grid item>
            <IconButton
              color="secondary"
              onClick={() => alert('Password change coming soon!')}
              style={{ color: '#f44336' }}
            >
              <Lock />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
