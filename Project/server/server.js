// Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); 
const Event = require('./models/Event');

const app = express();
const port = process.env.PORT || 5000;

// Weather API Configuration (Read from .env)
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 2. DATABASE CONNECTION
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connection successful!'))
  .catch((err) => console.error('MongoDB connection error:', err));


// --- WEATHER HELPER FUNCTION (CORE LOGIC) ---

async function getRelevantWeatherForecast(location, eventDate, eventTime) {
    console.log(`[WEATHER] Attempting to fetch forecast for ${location} on ${eventDate} at ${eventTime}`);

    if (!WEATHER_API_KEY) {
        console.error("OpenWeatherMap API Key is missing!");
        return { description: "Weather key missing." };
    }

    // --- FIX FOR TIME ZONE ACCURACY (10:30 AM issue) ---
    // 1. Get components from the input strings (e.g., "2025-12-15", "10:30") 
    
    const [year, month, day] = eventDate.split('-').map(Number);
    const [hours, minutes] = eventTime.split(':').map(Number);
    
    // 2. Create the target time using Date.UTC() to prevent local server time zone from shifting the hours.
    // Note: JavaScript months are 0-indexed (Jan=0), so we use (month - 1).
    const targetDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    const targetTime = targetDate.getTime();
    // ------------------------------------------------------------------

    // Max forecast is 5 days (OpenWeatherMap free tier)
    const maxForecastTime = Date.now() + (5 * 24 * 60 * 60 * 1000); 

    if (targetTime > maxForecastTime) {
        return { description: "Forecast date is beyond the 5-day window." };
    }

    try {
        console.log(`[WEATHER] Making API call to ${WEATHER_BASE_URL}...`);
        const response = await axios.get(WEATHER_BASE_URL, {
            params: {
                q: location, 
                appid: WEATHER_API_KEY,
                units: 'metric' 
            }
        });

        console.log(`[WEATHER] API call successful! Status: ${response.status}`);

        const forecastList = response.data.list;
        
        let closestForecast = null;
        let minDiff = Infinity;

        // Find the forecast entry closest to the accurate combined time
        for (const forecast of forecastList) {
            const forecastTime = forecast.dt * 1000; 
            const diff = Math.abs(forecastTime - targetTime);

            if (diff < minDiff) {
                minDiff = diff;
                closestForecast = forecast;
            }
        }

        if (closestForecast) {
            return {
                temp: closestForecast.main.temp,
                description: closestForecast.weather[0].description,
                icon: closestForecast.weather[0].icon,
                timeFetched: new Date().toISOString(),
                // Add the time of the forecast that was matched for transparency
                matchTime: new Date(closestForecast.dt_txt).toLocaleTimeString()
            };
        }

        return { description: "Error processing forecast data." };

    } catch (error) {
        console.error(`[WEATHER] CRITICAL AXIOS ERROR for ${location}:`, error.message);
        if (error.response && error.response.status === 404) {
            return { description: `Location '${location}' not found.` };
        }
        return { description: "Weather service failed." };
    }
}

// 3. ROOT ROUTE (Test)
app.get('/', (req, res) => {
  res.send('Event Planner API is running.');
});


// 4. API Routes

// ------------------------------------------------------------------
// A. GET ALL (READ)
// ------------------------------------------------------------------
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error while fetching events');
  }
});

// ------------------------------------------------------------------
// B. GET ONE (READ ONE - CRUCIAL FOR EDIT FUNCTION)
// ------------------------------------------------------------------
app.get('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId); 

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    res.json(event);

  } catch (err) {
    console.error('Error fetching single event:', err.message);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Event ID format' });
    }
    res.status(500).send('Server Error while fetching single event');
  }
});

// ------------------------------------------------------------------
// C. POST (CREATE)
// ------------------------------------------------------------------
app.post('/api/events', async (req, res) => {
  try {
    const { eventName, eventDate, eventTime, locationCity } = req.body;

    if (!eventName || !eventDate || !eventTime || !locationCity) {
      return res.status(400).json({ msg: 'Please enter all required fields.' });
    }
    
    // Fetch weather before saving
    const weatherForecast = await getRelevantWeatherForecast(locationCity, eventDate, eventTime);

    const newEvent = new Event({
      eventName,
      eventDate,
      eventTime, 
      locationCity,
      weatherForecast 
    });

    const savedEvent = await newEvent.save();

    res.json(savedEvent); 

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ------------------------------------------------------------------
// D. PUT (UPDATE)
// ------------------------------------------------------------------
app.put('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { eventName, eventDate, eventTime, locationCity } = req.body;
    
    if (!eventName || !eventDate || !eventTime || !locationCity) {
      return res.status(400).json({ msg: 'Please enter all required fields.' });
    }

    // Fetch new weather on update
    const weatherForecast = await getRelevantWeatherForecast(locationCity, eventDate, eventTime);

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { 
        eventName, 
        eventDate, 
        eventTime,
        locationCity,
        weatherForecast 
      }, 
      { new: true, runValidators: true } 
    );

    if (!updatedEvent) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(updatedEvent); 

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Event ID format' });
    }
    if (err.name === 'ValidationError') {
         return res.status(400).json({ msg: err.message });
    }
    res.status(500).send('Server Error while updating');
  }
});

// ------------------------------------------------------------------
// E. DELETE (DELETE)
// ------------------------------------------------------------------
app.delete('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    const result = await Event.findByIdAndDelete(eventId);

    if (!result) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json({ msg: 'Event deleted successfully', id: eventId });

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid Event ID format' });
    }
    res.status(500).send('Server Error while deleting');
  }
});

// 5. LISTEN
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});