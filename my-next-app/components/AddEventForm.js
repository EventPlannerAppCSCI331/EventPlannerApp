// src/components/AddEventForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
import { eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

const AddEventForm = ({ open, onClose, onSubmit, selectedDate, handleDateChange }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(selectedDate || '');  // Default to selected date
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [addForAllDays, setAddForAllDays] = useState(false);  // State for "Add for all days" checkbox

  // Use useEffect to update eventDate when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  }, [selectedDate]);

  // Handle the event creation
  const handleSubmit = () => {
    const newEvent = {
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      description: eventDescription,
    };

    if (addForAllDays) {
      // Create events for all days in the current month
      const startOfMonthDate = startOfMonth(new Date(eventDate));
      const endOfMonthDate = endOfMonth(new Date(eventDate));

      const daysInMonth = eachDayOfInterval({
        start: startOfMonthDate,
        end: endOfMonthDate,
      });

      daysInMonth.forEach((day) => {
        const eventForDay = { ...newEvent, date: day.toISOString().split('T')[0] };
        onSubmit(eventForDay);
      });
    } else {
      // Single day event
      onSubmit(newEvent);
    }

    // Reset form
    setEventName('');
    setEventDate('');
    setEventTime('');
    setEventLocation('');
    setEventDescription('');
    setAddForAllDays(false);  // Reset checkbox state
    onClose();  // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Event Name"
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Event Date"
          type="date"
          fullWidth
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Event Time"
          type="time"
          fullWidth
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Location"
          fullWidth
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />

        {/* Checkbox for adding event to all days in the month */}
        <FormControlLabel
          control={
            <Checkbox
              checked={addForAllDays}
              onChange={(e) => setAddForAllDays(e.target.checked)}
              color="primary"
            />
          }
          label="Add this event for all days in the month"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventForm;
