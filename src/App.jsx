import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyEvents from './pages/MyEvents';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-events" element={<MyEvents />} />
    </Routes>
  );
}

export default App;