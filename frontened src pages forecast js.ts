import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

function Forecast() {
  // Mock data
  const forecast = { rainfall: '10mm', flowChange: '+5%', turbidityRisk: 'High', alerts: 'Heavy rain expected' };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Forecast Module</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card><CardContent><Typography>Expected Rainfall: {forecast.rainfall}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent><Typography>Flow Rate Change: {forecast.flowChange}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent><Typography>Turbidity Risk: {forecast.turbidityRisk}</Typography></CardContent></Card>
        </Grid>
        <Grid item xs={12}>
          <Card><CardContent><Typography>Weather Alerts: {forecast.alerts}</Typography></CardContent></Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Forecast;