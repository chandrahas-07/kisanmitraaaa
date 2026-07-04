import React from 'react';
import { Link } from 'react-router-dom';

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

export default Navbar;