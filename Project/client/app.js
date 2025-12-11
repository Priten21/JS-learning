const API_URL = 'http://localhost:3000/api/events';

// DOM refs
const eventForm = document.getElementById('event-form');
const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');
const eventTimeInput = document.getElementById('event-time'); // ADDED REF
const locationCityInput = document.getElementById('location-city');
const resultsContainer = document.getElementById('results-container');

// State for edit mode
let editMode = false;
let editId = null;

// --- Helpers ---

async function safeParseJSON(response) {
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
        try {
            return await response.json();
        } catch (err) {
            console.warn('Failed to parse JSON body:', err);
            return null;
        }
    }
    return null;
}

function validateEventPayload(payload) {
    if (!payload.eventName || !payload.eventDate || !payload.eventTime || !payload.locationCity) {
        return false;
    }
    return true;
}

function resetForm() {
    eventForm.reset();
    editMode = false;
    editId = null;
    const submitBtn = eventForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Save Event';
}

function escapeHtml(unsafe) {
    if (unsafe == null) return '';
    return String(unsafe)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

// --- Event handlers ---

eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        eventName: eventNameInput.value.trim(),
        eventDate: eventDateInput.value,
        eventTime: eventTimeInput.value, // CAPTURE TIME
        locationCity: locationCityInput.value.trim()
    };

    if (!validateEventPayload(payload)) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        if (editMode && editId) {
            await updateEvent(editId, payload);
        } else {
            await saveEvent(payload);
        }
        resetForm();
        await fetchEvents(); 
    } catch (err) {
        console.error('Submit error:', err);
        alert('An error occurred. See console for details.');
    }
});

// Event delegation for Edit/Delete buttons (Logic remains the same)
resultsContainer.addEventListener('click', async (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    const editBtn = e.target.closest('.edit-btn');

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (!id) return;
        if (!confirm('Are you sure you want to delete this event?')) return;
        await deleteEvent(id);
        await fetchEvents();
        return;
    }

    if (editBtn) {
        const id = editBtn.dataset.id;
        if (!id) return;
        startEdit(id);
        return;
    }
});

// --- CRUD functions ---

async function saveEvent(data) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const body = await safeParseJSON(response);

        if (response.ok) {
            console.log('Saved event:', body);
            alert(`Event "${body?.eventName || data.eventName}" saved!`);
            return body;
        } else {
            const msg = body?.msg || body?.message || `Server returned ${response.status}`;
            console.error('Failed to save event:', msg);
            alert(`Error saving event: ${msg}`);
            throw new Error(msg);
        }
    } catch (error) {
        console.error('Network/Server error saving event:', error);
        alert('Network or server error. Check console.');
        throw error;
    }
}

async function fetchEvents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
        const events = await safeParseJSON(response) || [];
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        resultsContainer.innerHTML = '<p class="error">Could not load saved events.</p>';
    }
}

function displayEvents(events) {
    resultsContainer.innerHTML = ''; 

    if (!Array.isArray(events) || events.length === 0) {
        resultsContainer.innerHTML = '<p>No saved events yet. Start planning!</p>';
        return;
    }

    events.forEach(event => {
        const date = event.eventDate ? new Date(event.eventDate).toLocaleDateString() : '—';
        // Display both date and time
        const time = event.eventTime ? event.eventTime : 'N/A';
        
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.dataset.id = event._id;

        // --- WEATHER RENDERING LOGIC ---
        const weather = event.weatherForecast;
        let weatherHTML = '';

        if (weather && weather.description) {
            const iconUrl = weather.icon ? `https://openweathermap.org/img/wn/${weather.icon}.png` : '';
            
            weatherHTML = `
                <p>☀️ <strong>Forecast:</strong> ${escapeHtml(weather.description)}</p>
                <p>🌡️ <strong>Temp:</strong> ${weather.temp ? escapeHtml(weather.temp.toFixed(1)) + ' °C' : 'N/A'}</p>
                ${iconUrl ? `<img src="${iconUrl}" alt="Weather icon" style="width: 30px; height: 30px; vertical-align: middle;">` : ''}
                ${weather.matchTime ? `<small style="color:#666;">Matched Forecast Time: ${escapeHtml(weather.matchTime)}</small>` : ''}
            `;
        } else if (weather && weather.description) {
             weatherHTML = `<p class="error-msg" style="color:red;">${escapeHtml(weather.description)}</p>`;
        } else {
            weatherHTML = '<p>No forecast data available.</p>';
        }
        // --- END WEATHER RENDERING LOGIC ---


        eventCard.innerHTML = `
            <h3>${escapeHtml(event.eventName)}</h3>
            <p>📅 Date: ${escapeHtml(date)} at ${escapeHtml(time)}</p>
            <p>📍 Location: ${escapeHtml(event.locationCity)}</p>
            
            <div class="actions">
                <button class="edit-btn" data-id="${event._id}">Edit</button> 
                <button class="delete-btn" data-id="${event._id}">Delete</button>
            </div>
            
            <div class="weather-info">${weatherHTML}</div>
        `;

        resultsContainer.appendChild(eventCard);
    });
}

/** Delete event by id (Logic remains the same) */
async function deleteEvent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            const body = await safeParseJSON(response);
            const msg = body?.msg || body?.message || `Failed to delete (${response.status})`;
            throw new Error(msg);
        }
        console.log(`Event ${id} deleted`);
    } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete the event. See console for details.');
    }
}

/** Start editing flow: load the event into the form */
async function startEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch event ${id}`);
        }
        const event = await safeParseJSON(response);
        if (!event) throw new Error('No event payload returned');

        // Fill form
        eventNameInput.value = event.eventName || '';
        eventDateInput.value = event.eventDate ? event.eventDate.split('T')[0] : '';
        eventTimeInput.value = event.eventTime || ''; // ADDED: Retrieve time
        locationCityInput.value = event.locationCity || '';

        // Set state
        editMode = true;
        editId = id;

        // Change submit button text
        const submitBtn = eventForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Event';
    } catch (err) {
        console.error('Error entering edit mode:', err);
        alert('Could not load event for editing.');
    }
}

/** Update event by id (PUT) (Logic remains the same) */
async function updateEvent(id, data) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const body = await safeParseJSON(response);

        if (response.ok) {
            console.log('Updated event:', body);
            alert(`Event "${body?.eventName || data.eventName}" updated!`);
            return body;
        } else {
            const msg = body?.msg || body?.message || `Server returned ${response.status}`;
            console.error('Failed to update event:', msg);
            alert(`Error updating event: ${msg}`);
            throw new Error(msg);
        }
    } catch (error) {
        console.error('Network/Server error updating event:', error);
        alert('Network or server error. Check console.');
        throw error;
    }
}


// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});