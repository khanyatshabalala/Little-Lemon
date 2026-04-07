import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Reservations.css';

const API = 'http://localhost:5000/api';

function Reservations() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', date: '', time: '', guests: '', occasion: 'Birthday' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate('/login');
    setError(''); setStatus(''); setLoading(true);
    try {
      const res = await fetch(`${API}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStatus(`Reservation confirmed for ${data.date} at ${data.time}!`);
      setForm(f => ({ ...f, date: '', time: '', guests: '' }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reservations">
      <h1>Reserve a Table</h1>
      {status && <p className="reservations__success">{status}</p>}
      {error && <p className="reservations__error">{error}</p>}
      <form className="reservations__form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Time
          <input name="time" type="time" value={form.time} onChange={handleChange} required />
        </label>
        <label>
          Guests
          <input name="guests" type="number" min="1" max="20" placeholder="Number of guests" value={form.guests} onChange={handleChange} required />
        </label>
        <label>
          Occasion
          <select name="occasion" value={form.occasion} onChange={handleChange}>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Make Your Reservation'}
        </button>
      </form>
    </main>
  );
}

export default Reservations;
