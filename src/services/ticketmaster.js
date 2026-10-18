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
  if (res.status === 429) throw new Error('Too many requests. Wait a moment and try again.');
  if (!res.ok) throw new Error('Failed to fetch events');

  const data = await res.json();
  return { events: data._embedded?.events || [], page: data.page };
}

export async function fetchCategories() {
  const query = new URLSearchParams({ apikey: API_KEY, size: 100 });
  const res = await fetch(`${BASE_URL}/classifications.json?${query}`);
  if (!res.ok) throw new Error('Failed to fetch categories');

  const data = await res.json();
  const segments = (data._embedded?.classifications || [])
    .map((c) => c.segment)
    .filter(Boolean);
  // remove duplicates by id
  return segments.filter((s, i) => segments.findIndex((x) => x.id === s.id) === i);
}

export async function fetchEventById(id) {
  const query = new URLSearchParams({ apikey: API_KEY });
  const res = await fetch(`${BASE_URL}/events/${id}.json?${query}`);
  if (res.status === 404) throw new Error('Event not found');
  if (res.status === 429) throw new Error('Too many requests. Wait a moment and try again.');
  if (!res.ok) throw new Error('Failed to fetch event details');
  return res.json();
}