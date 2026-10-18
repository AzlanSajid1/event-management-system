# Event Management System

A React app for exploring events from the Ticketmaster Discovery API, registering for them, and managing your registered events.

## Features

- User registration, login and logout (frontend simulation using localStorage)
- Persistent login across page refreshes
- Browse upcoming events with pagination
- Search by keyword and filter by category, city and date range
- Event details: date, time, venue, location, category, price, image, Ticketmaster link
- Register for events (duplicate registration prevented) and cancel registration
- My Events page with Upcoming and Completed sections
- Protected routes, loading and error states, form validation
- Responsive layout

## Tech Stack

- React (Vite)
- Redux Toolkit (auth, events and registrations slices)
- React Router
- Ticketmaster Discovery API

## Setup

1. Clone the repository:
git clone https://github.com/AzlanSajid1/event-management-system.git
cd event-management-system

2. Install dependencies:

npm install

3. Get a free API key (Consumer Key) from https://developer.ticketmaster.com/
4. Create a `.env` file in the project root:
VITE_TM_API_KEY=your_consumer_key_here

5. Start the dev server:

npm run dev

6. Open the localhost address shown in the terminal.

## Project Structure
src/
components/ Navbar, EventCard, SearchBar, RegisterButton, ProtectedRoute
pages/ Login, Register, Events, EventDetails, MyEvents
store/ store.js, authSlice.js, eventsSlice.js, registrationsSlice.js
services/ ticketmaster.js


## Notes

- Authentication is simulated on the frontend. Users and registrations are stored in the browser's localStorage, and passwords are stored in plain text, which is not suitable for production.
- The `.env` file is not committed. Never commit your API key
