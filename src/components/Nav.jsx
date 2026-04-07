import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';
import './Nav.css';

function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/"><img src={logo} alt="Little Lemon" className="nav__logo" /></Link>
      <ul className="nav__links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>
        <li><Link to="/order">Order Online</Link></li>
        {user ? (
          <>
            <li className="nav__user">Hi, {user.name}</li>
            <li><button className="nav__logout" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
