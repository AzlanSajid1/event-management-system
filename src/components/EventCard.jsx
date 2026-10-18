import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const image =
    event.images?.find((img) => img.ratio === '16_9' && img.width > 500)?.url ||
    event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const category = event.classifications?.[0]?.segment?.name;

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden' }}>
      {image && <img src={image} alt={event.name} style={{ width: '100%' }} />}
      <div style={{ padding: '0.75rem' }}>
        <h3>{event.name}</h3>
        <p>
          {event.dates?.start?.localDate} {event.dates?.start?.localTime}
        </p>
        <p>
          {venue?.name}
          {venue?.city?.name ? `, ${venue.city.name}` : ''}
        </p>
        {category && <p>{category}</p>}
        <Link to={`/events/${event.id}`}>View details</Link>
      </div>
    </div>
  );
} 

export default EventCard;