import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Little Lemon</h1>
        <h2 className="hero__subtitle">Chicago</h2>
        <p className="hero__desc">
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <button className="hero__btn" onClick={() => navigate('/reservations')}>Reserve a Table</button>
      </div>
      <img src={heroImg} alt="Food at Little Lemon" className="hero__img" />
    </section>
  );
}

export default Hero;
