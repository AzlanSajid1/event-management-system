import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; // NEW
import { login, clearError } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const { error, currentUser } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!form.email.trim()) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    dispatch(login(form));
  };

  // NEW: must be below all hooks, above the return
  if (currentUser) return <Navigate to="/" replace />;

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default Login;