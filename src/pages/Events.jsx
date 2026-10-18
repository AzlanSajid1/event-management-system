import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../store/eventsSlice';
import EventCard from '../components/EventCard';

function Events() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (items.length === 0) return <p>No events found.</p>;

  return (
    <div>
      <h2>Upcoming Events</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        {items.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;