import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRegistration } from '../store/registrationsSlice';

function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function RegistrationItem({ registration, canCancel, onCancel }) {
  const { event, registeredAt } = registration;

  return (
    <div className="reg-item">
      {event.image && <img src={event.image} alt={event.name} />}
      <div>
        <h3>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </h3>
        <p>
          {event.date} {event.time || ''}
        </p>
        <p>
          {event.venue || 'Venue to be announced'}
          {event.city ? `, ${event.city}` : ''}
        </p>
        <p className="muted">Registered on {new Date(registeredAt).toLocaleDateString()}</p>
        {canCancel && <button onClick={onCancel}>Cancel registration</button>}
      </div>
    </div>
  );
}

function MyEvents() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations.items);

  const mine = registrations.filter((r) => r.userId === currentUser.id);
  const today = todayString();

  const upcoming = mine
    .filter((r) => r.event.date >= today)
    .sort((a, b) => a.event.date.localeCompare(b.event.date));
  const completed = mine
    .filter((r) => !r.event.date || r.event.date < today)
    .sort((a, b) => (b.event.date || '').localeCompare(a.event.date || ''));

  const handleCancel = (eventId) => {
    dispatch(cancelRegistration({ userId: currentUser.id, eventId }));
  };

  return (
    <div className="container">
      <h2 className="page-title">My Events</h2>

      {mine.length === 0 && (
        <p>
          You haven't registered for any events yet. <Link to="/">Browse events</Link>
        </p>
      )}

      {upcoming.length > 0 && (
        <>
          <h3>Upcoming</h3>
          <div className="reg-list">
            {upcoming.map((r) => (
              <RegistrationItem
                key={r.event.id}
                registration={r}
                canCancel
                onCancel={() => handleCancel(r.event.id)}
              />
            ))}
          </div>
        </>
      )}

      {completed.length > 0 && (
        <>
          <h3>Completed</h3>
          <div className="reg-list">
            {completed.map((r) => (
              <RegistrationItem key={r.event.id} registration={r} canCancel={false} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyEvents;