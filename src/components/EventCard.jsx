import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const image =
    event.images?.find((img) => img.ratio === '16_9' && img.width > 500)?.url ||
    event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const category = event.classifications?.[0]?.segment?.name;

  return (
    <div className="card">
      {image && <img src={image} alt={event.name} />}
      <div className="card-body">
        {category && <span className="badge">{category}</span>}
        <h3>{event.name}</h3>
        <p className="muted">
          {event.dates?.start?.localDate} {event.dates?.start?.localTime}
        </p>
        <p className="muted">
          {venue?.name}
          {venue?.city?.name ? `, ${venue.city.name}` : ''}
        </p>
        <Link to={`/events/${event.id}`}>View details</Link>
      </div>
    </div>
  );
}

export default EventCard;