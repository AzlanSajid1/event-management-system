import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadEventById } from '../store/eventsSlice';
import RegisterButton from '../components/RegisterButton'; // NEW

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: event, selectedLoading, selectedError } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(loadEventById(id));
  }, [dispatch, id]);

  if (selectedLoading) return <p>Loading event...</p>;
  if (selectedError) return <p style={{ color: 'red' }}>{selectedError}</p>;
  if (!event) return null;

  const image =
    event.images?.find((img) => img.ratio === '16_9' && img.width > 1000)?.url ||
    event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0];
  const classification = event.classifications?.[0];
  const price = event.priceRanges?.[0];
  const start = event.dates?.start;
  const address = [venue?.address?.line1, venue?.city?.name, venue?.state?.name, venue?.country?.name]
    .filter(Boolean)
    .join(', ');

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      <Link to="/">&larr; Back to events</Link>
      {image && <img src={image} alt={event.name} style={{ width: '100%', marginTop: '1rem' }} />}
      <h2>{event.name}</h2>

      <p><strong>Date:</strong> {start?.localDate} {start?.localTime || ''}</p>
      <p><strong>Venue:</strong> {venue?.name || 'To be announced'}</p>
      {address && <p><strong>Location:</strong> {address}</p>}
      <p>
        <strong>Category:</strong>{' '}
        {[classification?.segment?.name, classification?.genre?.name, classification?.subGenre?.name]
          .filter(Boolean)
          .join(' / ') || 'N/A'}
      </p>
      {price && (
        <p>
          <strong>Price:</strong> {price.min} - {price.max} {price.currency}
        </p>
      )}
      <p><strong>Status:</strong> {event.dates?.status?.code}</p>
      {event.info && <p><strong>Info:</strong> {event.info}</p>}
      {event.pleaseNote && <p><strong>Please note:</strong> {event.pleaseNote}</p>}

      <RegisterButton event={event} /> {/* NEW */}

      {event.url && (
        <p>
          <a href={event.url} target="_blank" rel="noreferrer">
            View on Ticketmaster
          </a>
        </p>
      )}
    </div>
  );
}

export default EventDetails;