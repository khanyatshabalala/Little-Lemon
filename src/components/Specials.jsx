import { useNavigate } from 'react-router-dom';
import './Specials.css';

const specials = [
  {
    id: 1,
    name: 'Greek Salad',
    price: '$12.99',
    desc: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    emoji: '🥗',
  },
  {
    id: 2,
    name: 'Bruschetta',
    price: '$5.99',
    desc: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    emoji: '🍞',
  },
  {
    id: 3,
    name: 'Lemon Dessert',
    price: '$5.00',
    desc: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    emoji: '🍋',
  },
];

function SpecialCard({ item }) {
  const navigate = useNavigate();
  return (
    <article className="card">
      <div className="card__img">{item.emoji}</div>
      <div className="card__body">
        <div className="card__header">
          <h3 className="card__name">{item.name}</h3>
          <span className="card__price">{item.price}</span>
        </div>
        <p className="card__desc">{item.desc}</p>
        <button className="card__btn" onClick={() => navigate('/order')}>Order a delivery 🛵</button>
      </div>
    </article>
  );
}

function Specials() {
  const navigate = useNavigate();
  return (
    <section className="specials">
      <div className="specials__header">
        <h2 className="specials__title">This week's specials!</h2>
        <button className="specials__menu-btn" onClick={() => navigate('/menu')}>Online Menu</button>
      </div>
      <div className="specials__grid">
        {specials.map((item) => (
          <SpecialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Specials;
