import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Reporting from './pages/Reporting';
import Forecast from './pages/Forecast';
import Management from './pages/Management';
import Map from './pages/Map';
import ReportsHub from './pages/ReportsHub';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: { main: '#E3F2FD' }, // Light blue
    secondary: { main: '#4CAF50' }, // Green
    mode: 'light',
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/management" element={<Management />} />
            <Route path="/map" element={<Map />} />
            <Route path="/reports" element={<ReportsHub />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;