import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// ==========================================
// 1. AUTH CONTEXT (Mock Login)
// ==========================================
const AuthContext = React.createContext(null);

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('kisan_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    if (username && password) {
      const userData = { username, email: `${username}@kisan.com` };
      localStorage.setItem('kisan_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (username, password, email) => {
    if (username && password && email) {
      const userData = { username, email };
      localStorage.setItem('kisan_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('kisan_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// 2. NAVBAR
// ==========================================
function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#2E7D32',
      color: 'white',
      flexWrap: 'wrap'
    }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>🌾 KisanMitraAAA</div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>🛒 Cart</Link>
        <Link to="/farmer" style={{ color: 'white', textDecoration: 'none' }}>Farmer Portal</Link>
        {user && <span style={{ color: '#FFD700' }}>👋 {user.username}</span>}
        {user ? (
          <button onClick={logout} style={{
            padding: '5px 15px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Logout</button>
        ) : (
          <Link to="/login">
            <button style={{
              padding: '5px 15px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

// ==========================================
// 3. LOGIN PAGE
// ==========================================
function LoginPage() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2E7D32' }}>🔐 Login</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Use any username/password to login</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#4CAF50' }}>Sign Up</Link>
      </p>
    </div>
  );
}

// ==========================================
// 4. SIGNUP PAGE
// ==========================================
function SignupPage() {
  const { user, signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password && email) {
      signup(username, password, email);
      setError('');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2E7D32' }}>📝 Sign Up</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Create your KisanMitraAAA account</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
          />
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: '#4CAF50' }}>Login</Link>
      </p>
    </div>
  );
}

// ==========================================
// 5. HOME
// ==========================================
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
        <Link to="/products">
          <button style={{ 
            padding: '15px 40px', 
            fontSize: '18px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}>
            🛒 Start Shopping
          </button>
        </Link>
        <Link to="/farmer">
          <button style={{ 
            padding: '15px 40px', 
            fontSize: '18px', 
            backgroundColor: '#FF9800', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer' 
          }}>
            🚜 Farmer Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

// ==========================================
// 6. PRODUCTS
// ==========================================
function Products() {
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
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = existingCart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartUpdate(prev => prev + 1);
    alert(`✅ Added ${product.name} to cart!`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2E7D32' }}>🌾 Fresh Produce</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px', 
        padding: '20px' 
      }}>
        {products.map((product) => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '10px', 
            padding: '15px', 
            textAlign: 'center', 
            background: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px' }}>{product.image}</div>
            <h3>{product.name}</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>
              ₹{product.price}/{product.unit}
            </p>
            <button 
              onClick={() => addToCart(product)} 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer', 
                width: '100%' 
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 7. CART
// ==========================================
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
    const sum = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    setTotal(sum);
  };

  const removeItem = (id) => {
    let items = JSON.parse(localStorage.getItem('cart') || '[]');
    items = items.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(items));
    loadCart();
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
    alert(`✅ Order placed!\nTotal: ₹${total}\nItems: ${cartItems.length}\n\nThank you for choosing KisanMitraAAA! 🌾`);
    clearCart();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2E7D32' }}>🛒 Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px' }}>Your cart is empty. Start shopping!</p>
          <Link to="/products">
            <button style={{ 
              padding: '15px 30px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer' 
            }}>
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderBottom: '1px solid #ddd', 
              padding: '15px 0' 
            }}>
              <div>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>{item.image}</span>
                <strong>{item.name}</strong>
                <span style={{ marginLeft: '10px', color: '#666' }}>× {item.quantity || 1}</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '20px' }}>
                  ₹{item.price * (item.quantity || 1)}
                </span>
                <button 
                  onClick={() => removeItem(item.id)} 
                  style={{ 
                    padding: '5px 10px', 
                    backgroundColor: '#ff4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#E8F5E9', borderRadius: '10px' }}>
            <h2>Total: ₹{total}</h2>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
              <button 
                onClick={placeOrder} 
                style={{ 
                  padding: '15px 40px', 
                  backgroundColor: '#2E7D32', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '18px', 
                  cursor: 'pointer' 
                }}
              >
                Place Order 🚀
              </button>
              <button 
                onClick={clearCart} 
                style={{ 
                  padding: '15px 30px', 
                  backgroundColor: '#ff9800', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer' 
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ==========================================
// 8. FARMER DASHBOARD
// ==========================================
function FarmerDashboard() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#FF9800' }}>🚜 Farmer Dashboard</h1>
      <p>Welcome, Farmer! Here's your daily summary.</p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
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
// 9. MAIN APP
// ==========================================
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
