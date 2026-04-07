import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './OrderOnline.css';

const API = 'http://localhost:5000/api';

const menuItems = [
  { id: 1, name: 'Greek Salad', price: 12.99, emoji: '🥗', category: 'Starters' },
  { id: 2, name: 'Bruschetta', price: 5.99, emoji: '🍞', category: 'Starters' },
  { id: 3, name: 'Grilled Fish', price: 18.99, emoji: '🐟', category: 'Mains' },
  { id: 4, name: 'Pasta', price: 14.99, emoji: '🍝', category: 'Mains' },
  { id: 5, name: 'Lemon Dessert', price: 5.00, emoji: '🍋', category: 'Desserts' },
  { id: 6, name: 'Baklava', price: 4.50, emoji: '🍯', category: 'Desserts' },
];

function OrderOnline() {
  const [cart, setCart] = useState({});
  const [status, setStatus] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const add = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id) => setCart(c => {
    const next = { ...c };
    if (next[id] > 1) next[id]--;
    else delete next[id];
    return next;
  });

  const total = menuItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const categories = [...new Set(menuItems.map(i => i.category))];

  const handleCheckout = async () => {
    if (!token) return navigate('/login');
    const items = menuItems
      .filter(i => cart[i.id])
      .map(i => ({ id: i.id, name: i.name, price: i.price, qty: cart[i.id] }));
    try {
      const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCart({});
      setStatus(`Order #${data.id} placed! Total: $${data.total}`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <main className="order">
      <h1>Order Online</h1>
      {status && <p className="order__status">{status}</p>}
      {categories.map(cat => (
        <div key={cat} className="order__section">
          <h2 className="order__category">{cat}</h2>
          <div className="order__grid">
            {menuItems.filter(i => i.category === cat).map(item => (
              <div key={item.id} className="order__card">
                <span className="order__emoji">{item.emoji}</span>
                <div className="order__info">
                  <span className="order__name">{item.name}</span>
                  <span className="order__price">${item.price.toFixed(2)}</span>
                </div>
                <div className="order__controls">
                  {cart[item.id] ? (
                    <>
                      <button onClick={() => remove(item.id)}>−</button>
                      <span>{cart[item.id]}</span>
                      <button onClick={() => add(item.id)}>+</button>
                    </>
                  ) : (
                    <button className="order__add" onClick={() => add(item.id)}>Add</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {itemCount > 0 && (
        <div className="order__summary">
          <span>{itemCount} item{itemCount > 1 ? 's' : ''}</span>
          <span>Total: ${total.toFixed(2)}</span>
      <button className="order__checkout" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </main>
  );
}

export default OrderOnline;
