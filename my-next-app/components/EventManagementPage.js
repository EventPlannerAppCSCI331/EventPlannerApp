// src/EventManagementPage.js
import React, { useState } from 'react';
import { Typography, Button, Grid, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EventForm from './EventForm'; // Same folder
import CalendarView from './CalendarView'; // One level up, to the src folder

const EventManagementPage = () => {
  const [events, setEvents] = useState([]);    // State to store events
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control form visibility

  // Function to add event to the list
  const addEvent = (event) => {
    setEvents([...events, event]);
    setIsFormOpen(false); // Close the form after event is added
  };

  // Function to open the form
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Function to close the form
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Event Management
      </Typography>

      {/* Button to open Event Form */}
      <Button variant="contained" color="primary" onClick={openForm}>
        Add Event
      </Button>

      {/* Display list of events */}
      <Grid container spacing={3} mt={3}>
        {events.map((event, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography>{event.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CalendarView to show events */}
      <CalendarView events={events} />

      {/* EventForm Dialog */}
      <Dialog open={isFormOpen} onClose={closeForm}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <EventForm onSave={addEvent} onClose={closeForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventManagementPage;
