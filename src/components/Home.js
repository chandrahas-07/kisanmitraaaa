import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
      minHeight: '80vh'
    }}>
      <h1 style={{ fontSize: '48px', color: '#1B5E20' }}>
        🌾 Welcome to KisanMitraAAA
      </h1>
      <p style={{ fontSize: '20px', color: '#2E7D32' }}>
        Fresh farm produce, delivered to your doorstep in 12 hours!
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/products')}
          style={{ 
            padding: '15px 40px', 
            fontSize: '18px', 
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🛒 Start Shopping
        </button>
        <button 
          onClick={() => navigate('/farmer')}
          style={{ 
            padding: '15px 40px', 
            fontSize: '18px', 
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🚜 Farmer Dashboard
        </button>
      </div>

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <div>
          <h3>🌱 Farm Fresh</h3>
          <p>Direct from farmers</p>
        </div>
        <div>
          <h3>🚚 12-Hour Delivery</h3>
          <p>Harvest to home</p>
        </div>
        <div>
          <h3>💰 Best Price</h3>
          <p>No middlemen</p>
        </div>
      </div>
    </div>
  );
}

export default Home;