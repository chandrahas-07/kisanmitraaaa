import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// ==========================================
// 1. AWS CONFIGURATION (YOUR EXACT DETAILS)
// ==========================================
const awsConfig = {
  Auth: {
    region: 'us-east-1', 
    userPoolId: 'us-east-1_UNHWmLkTn',
    userPoolWebClientId: '2iv4kpj887m9fqeogt3s4epkv7',
    mandatorySignIn: false,
  }
};

Amplify.configure(awsConfig);

// ==========================================
// 2. COMPONENTS
// ==========================================

function Navbar({ signOut, user }) {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2E7D32',
      color: 'white'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>🌾 KisanMitraAAA</div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>🛒 Cart</Link>
        <Link to="/farmer" style={{ color: 'white', textDecoration: 'none' }}>Farmer Portal</Link>
        
        {/* Show Username */}
        {user && <span style={{ color: '#FFD700' }}>👋 {user.username}</span>}
        
        {/* Logout Button */}
        <button onClick={signOut} style={{
          padding: '5px 15px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Logout</button>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '48px', color: '#1B5E20' }}>🌾 Welcome to KisanMitraAAA</h1>
      <p style={{ fontSize: '20px', color: '#2E7D32' }}>Fresh farm produce, delivered to your doorstep!</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Link to="/products"><button style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🛒 Start Shopping</button></Link>
        <Link to="/farmer"><button style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🚜 Farmer Dashboard</button></Link>
      </div>
    </div>
  );
}

function Products() {
  // State to trigger re-render when cart changes
  const [, setCartUpdate] = useState(0);

  const products = [
    { id: 1, name: 'Tomatoes', price: 40, unit: 'kg', image: '🍅' },
    { id: 2, name: 'Onions', price: 35, unit: 'kg', image: '🧅' },
    { id: 3, name: 'Potatoes', price: 30, unit: 'kg', image: '🥔' },
    { id: 4, name: 'Spinach', price: 20, unit: 'bundle', image: '🥬' },
    { id: 5, name: 'Carrots', price: 45, unit: 'kg', image: '🥕' },
    { id: 6, name: 'Mangoes', price: 80, unit: 'kg', image: '🥭' },
  ];

  const addToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add new item with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Trigger re-render (update the state to show feedback)
    setCartUpdate(prev => prev + 1);
    alert(`✅ Added ${product.name} to cart! (Total: ${existingCart.length} items)`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2E7D32' }}>🌾 Fresh Produce</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', background: 'white' }}>
            <div style={{ fontSize: '60px' }}>{product.image}</div>
            <h3>{product.name}</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>₹{product.price}/{product.unit}</p>
            <button onClick={() => addToCart(product)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cart() {
  // State to track cart items and trigger re-render
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    
    // Calculate total
    const sum = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    setTotal(sum);
  };

  const removeItem = (id) => {
    let items = JSON.parse(localStorage.getItem('cart') || '[]');
    items = items.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(items));
    loadCart(); // Refresh the cart view
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    loadCart();
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`✅ Order placed successfully!\nTotal: ₹${total}\nItems: ${cartItems.length}\n\nThank you for choosing KisanMitraAAA!`);
    clearCart();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2E7D32' }}>🛒 Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px' }}>Your cart is empty. Start shopping!</p>
          <Link to="/products">
            <button style={{ padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <div>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>{item.image}</span>
                <strong>{item.name}</strong>
                <span style={{ marginLeft: '10px', color: '#666' }}>× {item.quantity || 1}</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '20px' }}>₹{item.price * (item.quantity || 1)}</span>
                <button onClick={() => removeItem(item.id)} style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#E8F5E9', borderRadius: '10px' }}>
            <h2>Total: ₹{total}</h2>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={placeOrder} style={{ padding: '15px 40px', backgroundColor: '#2E7D32', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', cursor: 'pointer' }}>
                Place Order 🚀
              </button>
              <button onClick={clearCart} style={{ padding: '15px 30px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FarmerDashboard() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#FF9800' }}>🚜 Farmer Dashboard</h1>
      <p>Welcome, Farmer! Here's your daily summary.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#E8F5E9', borderRadius: '10px', textAlign: 'center' }}>
          <h3>📦 Products</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>6</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#FFF3E0', borderRadius: '10px', textAlign: 'center' }}>
          <h3>💰 Sales</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>₹750</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#E3F2FD', borderRadius: '10px', textAlign: 'center' }}>
          <h3>📊 Orders</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>5</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN APP (WRAPPED WITH AUTHENTICATOR)
// ==========================================
function App({ signOut, user }) {
  return (
    <Router>
      <div>
        <Navbar signOut={signOut} user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/farmer" element={<FarmerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);