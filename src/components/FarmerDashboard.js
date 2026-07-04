import React, { useState } from 'react';

function FarmerDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomatoes', quantity: 50, price: 40, status: 'Available' },
    { id: 2, name: 'Onions', quantity: 30, price: 35, status: 'Available' }
  ]);

  const [sales, setSales] = useState([
    { id: 1, product: 'Tomatoes', quantity: 10, buyer: 'Customer A', date: '2026-07-04' },
    { id: 2, product: 'Onions', quantity: 5, buyer: 'Customer B', date: '2026-07-04' }
  ]);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#FF9800' }}>🚜 Farmer Dashboard</h1>
      <p>Welcome, Farmer! Here's your daily summary.</p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        margin: '20px 0'
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#E8F5E9', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>📦 Total Products</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{products.length}</p>
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#FFF3E0', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>💰 Today's Sales</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>₹750</p>
        </div>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#E3F2FD', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>📊 Orders</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{sales.length}</p>
        </div>
      </div>

      <h2>Your Products</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#FF9800', color: 'white' }}>
            <th style={{ padding: '10px' }}>Product</th>
            <th style={{ padding: '10px' }}>Quantity</th>
            <th style={{ padding: '10px' }}>Price (₹)</th>
            <th style={{ padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{product.name}</td>
              <td style={{ padding: '10px' }}>{product.quantity} kg</td>
              <td style={{ padding: '10px' }}>₹{product.price}</td>
              <td style={{ padding: '10px' }}>
                <span style={{
                  backgroundColor: product.status === 'Available' ? '#4CAF50' : '#FF9800',
                  color: 'white',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}>
                  {product.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: '30px' }}>Recent Sales</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#2E7D32', color: 'white' }}>
            <th style={{ padding: '10px' }}>Product</th>
            <th style={{ padding: '10px' }}>Quantity</th>
            <th style={{ padding: '10px' }}>Buyer</th>
            <th style={{ padding: '10px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{sale.product}</td>
              <td style={{ padding: '10px' }}>{sale.quantity} kg</td>
              <td style={{ padding: '10px' }}>{sale.buyer}</td>
              <td style={{ padding: '10px' }}>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerDashboard;