import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
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

  if (currentUser) return <Navigate to="/" replace />;

  return (
    <div className="form-box">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {formErrors.password && <p className="error">{formErrors.password}</p>}

        {error && <p className="error">{error}</p>}
        <button type="submit">Log in</button>
      </form>
      <p className="muted">
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;