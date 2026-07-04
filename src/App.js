import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Navbar
function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2E7D32',
      color: 'white'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
        🌾 KisanMitraAAA
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>🛒 Cart</Link>
        <Link to="/farmer" style={{ color: 'white', textDecoration: 'none' }}>Farmer Portal</Link>
      </div>
    </nav>
  );
}

// Home
function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
      minHeight: '80vh'
    }}>
      <h1 style={{ fontSize: '48px', color: '#1B5E20' }}>🌾 Welcome to KisanMitraAAA</h1>
      <p style={{ fontSize: '20px', color: '#2E7D32' }}>
        Fresh farm produce, delivered to your doorstep in 12 hours!
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Link to="/products">
          <button style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            🛒 Start Shopping
          </button>
        </Link>
        <Link to="/farmer">
          <button style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            🚜 Farmer Dashboard
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <h3>🌱 Farm Fresh</h3>
          <p>Direct from farmers</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <h3>🚚 12-Hour Delivery</h3>
          <p>Harvest to home</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <h3>💰 Best Price</h3>
          <p>No middlemen</p>
        </div>
      </div>
    </div>
  );
}

// Products
function Products() {
  const products = [
    { id: 1, name: 'Tomatoes', price: 40, unit: 'kg', image: '🍅' },
    { id: 2, name: 'Onions', price: 35, unit: 'kg', image: '🧅' },
    { id: 3, name: 'Potatoes', price: 30, unit: 'kg', image: '🥔' },
    { id: 4, name: 'Spinach', price: 20, unit: 'bundle', image: '🥬' },
    { id: 5, name: 'Carrots', price: 45, unit: 'kg', image: '🥕' },
    { id: 6, name: 'Mangoes', price: 80, unit: 'kg', image: '🥭' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2E7D32' }}>🌾 Fresh Produce</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: '60px' }}>{product.image}</div>
            <h3>{product.name}</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>₹{product.price}/{product.unit}</p>
            <button onClick={() => alert(`✅ Added ${product.name} to cart!`)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Cart
function Cart() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🛒 Your Cart</h1>
      <p style={{ fontSize: '18px' }}>Your cart is empty. Start shopping!</p>
      <Link to="/products">
        <button style={{ padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
          Browse Products
        </button>
      </Link>
    </div>
  );
}

// Farmer Dashboard
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

// Main App
function App() {
  return (
    <Router>
      <div>
        <Navbar />
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

export default App;