import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const API = 'http://localhost:5000/api';

function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(API + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <div className="login__card">
        <h1>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        <p className="login__sub">
          {mode === 'login' ? 'Sign in to your Little Lemon account' : 'Join Little Lemon today'}
        </p>

        {error && <p className="login__error">{error}</p>}

        <form className="login__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Name
              <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
            </label>
          )}
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="login__toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </main>
  );
}

export default Login;
