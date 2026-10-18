import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerForEvent, cancelRegistration } from '../store/registrationsSlice';

function RegisterButton({ event }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations.items);
  const [message, setMessage] = useState('');

  if (!currentUser) {
    return (
      <p>
        <Link to="/login">Log in</Link> to register for this event.
      </p>
    );
  }

  const isRegistered = registrations.some(
    (r) => r.userId === currentUser.id && r.event.id === event.id
  );

  const handleRegister = () => {
    const summary = {
      id: event.id,
      name: event.name,
      date: event.dates?.start?.localDate,
      time: event.dates?.start?.localTime,
      venue: event._embedded?.venues?.[0]?.name,
      city: event._embedded?.venues?.[0]?.city?.name,
      image: event.images?.[0]?.url,
    };
    dispatch(registerForEvent({ userId: currentUser.id, event: summary }));
    setMessage('You are registered for this event!');
  };

  const handleCancel = () => {
    dispatch(cancelRegistration({ userId: currentUser.id, eventId: event.id }));
    setMessage('Your registration was cancelled.');
  };

  return (
    <div>
      {isRegistered ? (
        <button onClick={handleCancel}>Cancel registration</button>
      ) : (
        <button onClick={handleRegister}>Register for this event</button>
      )}
      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default RegisterButton;