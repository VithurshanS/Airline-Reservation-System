import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Userprofile from '../Userprofile/Userprofile';
import BookingInfo from '../BookingInfo/BookingInfo';
import UserHome from '../UserHome/UserHome';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon fontSize="large" style={{ color: '#2196f3' }} />, // Larger home icon
  },
  {
    segment: 'account',
    title: 'Account',
    icon: <AccountCircleIcon fontSize="large" style={{ color: '#2196f3' }} />, // Larger account icon
  },
  {
    segment: 'booking-info',
    title: 'Booking Info',
    icon: <InfoIcon fontSize="large" style={{ color: '#2196f3' }} />, // Larger info icon
  },
];

const demoTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#e3f2fd',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
      color: '#0d47a1',
    },
    body1: {
      fontSize: '1.1rem',
      color: '#0d47a1',
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function DemoPageContent({ pathname }) {
  // Define what to display based on the pathname
  let content;
  switch (pathname) {
    case '/home':
      content = <UserHome/>;
      break;
    case '/account':
      content = <Userprofile />;
      break;
    case '/booking-info':
      content = <BookingInfo/>;
      break;
    default:
      content = 'Select an option from the sidebar';
  }

  return (
    <Box
      sx={{
        py: 4,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        {typeof content === 'string' ? content : ''}
      </Typography>
      {typeof content !== 'string' && content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/home'); // Set default route to 'home'

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <ThemeProvider theme={demoTheme}>
      <AppProvider
        branding={{title: "User Dashboard"}}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <Box
            sx={{
              backgroundColor: '#e3f2fd',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <DemoPageContent pathname={router.pathname} />
          </Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
