import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField, Button, Rating } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Reporting() {
  const [reports, setReports] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get('/api/reports').then(res => setReports(res.data));
  }, []);

  const onSubmit = async (data) => {
    await axios.post('/api/reports', data);
    reset();
    // Refresh reports
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Community Reporting</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Location" {...register('location')} sx={{ mt: 2 }} />
        <Rating {...register('rating')} />
        <TextField fullWidth label="Description" {...register('description')} sx={{ mt: 2 }} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit Report</Button>
      </form>
      <Typography>Active Contributors: {reports.length}</Typography>
      <Grid container spacing={3}>
        {reports.map(report => (
          <Grid item xs={12} md={4} key={report._id}>
            <Card>
              <CardContent>
                <Typography>{report.userId.name} - {report.location}</Typography>
                <Rating value={report.rating} readOnly />
                <Typography>{report.description}</Typography>
                <Typography>{new Date(report.timestamp).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Reporting;