const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TM_API_KEY;

export async function fetchEvents(params = {}) {
  const query = new URLSearchParams({
    apikey: API_KEY,
    size: 20,
    sort: 'date,asc',
    ...params,
  });

  const res = await fetch(`${BASE_URL}/events.json?${query}`);
  if (!res.ok) throw new Error('Failed to fetch events');

  const data = await res.json();
  return data._embedded?.events || [];
}