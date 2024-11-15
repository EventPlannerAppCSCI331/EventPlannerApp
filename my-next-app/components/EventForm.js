// src/EventForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const EventForm = ({ onSave, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    if (eventName && eventDate) {
      const newEvent = {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        description: eventDescription
      };
      onSave(newEvent); // Save the new event
    }
  };

  return (
    <div>
      <TextField
        label="Event Name"
        fullWidth
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Event Date"
        fullWidth
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Location"
        fullWidth
        value={eventLocation}
        onChange={(e) => setEventLocation(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginRight: '8px' }}>
          Save Event
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
