import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('/api/metrics').then(res => setMetrics(res.data));
    socket.on('metricUpdate', (update) => {
      setMetrics(prev => prev.map(m => m.location === update.location ? { ...m, ...update } : m));
      if (update.status === 'critical') setAlerts(prev => [...prev, `Critical at ${update.location}`]);
    });
  }, []);

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{ label: 'pH Trend', data: [7, 7.2, 6.8, 7.5, 7.1, 6.9, 7.3], borderColor: '#4CAF50' }],
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Monitoring Dashboard</Typography>
      <Grid container spacing={3}>
        {metrics.map(metric => (
          <Grid item xs={12} md={3} key={metric.location}>
            <Card>
              <CardContent>
                <Typography>{metric.location}</Typography>
                <Typography>pH: {metric.ph}</Typography>
                <Typography>Status: {metric.status}</Typography>
                <Typography>Last Updated: {new Date(metric.lastUpdated).toLocaleTimeString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card><CardContent><Typography>Active Alerts: {alerts.join(', ')}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: 300 }}><Line data={chartData} /></Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;