// server/models/Event.js

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true 
  },
  eventDate: {
    type: Date,
    required: true,
  },
  // ADDED: Field to store the time string (e.g., "14:30")
  eventTime: {
    type: String, 
    required: true,
  },
  locationCity: {
    type: String,
    required: true,
  },
  weatherForecast: { 
    type: Object, // Stores the weather JSON data (temp, icon, description)
    required: false,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;