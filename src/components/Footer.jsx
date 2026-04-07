import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__col">
        <h3>Little Lemon</h3>
        <p>A family owned Mediterranean restaurant in Chicago.</p>
      </div>
      <div className="footer__col">
        <h3>Doormat Navigation</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/reservations">Reservations</Link></li>
          <li><Link to="/order">Order Online</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
      <div className="footer__col">
        <h3>Contact</h3>
        <ul>
          <li>123 Lemon Street, Chicago</li>
          <li>+1 (312) 555-0100</li>
          <li>hello@littlelemon.com</li>
        </ul>
      </div>
      <div className="footer__col">
        <h3>Social Media</h3>
        <ul>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
