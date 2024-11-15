// src/components/CalendarView.js
import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

const CalendarView = ({ events }) => {
  const currentMonth = new Date().getMonth(); // Get current month

  return (
    <Paper>
      <Typography variant="h6">Calendar View</Typography>
      <Grid container spacing={2}>
        {/* Render your calendar events here */}
        {events.map((event, index) => (
          <Grid item key={index}>
            <Paper>{event.name}</Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CalendarView;  // Don't forget to export it!
