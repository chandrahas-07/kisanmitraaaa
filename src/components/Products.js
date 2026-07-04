import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get('KisanAPI', '/products');
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    // Simple cart logic
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading fresh produce...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2E7D32' }}>🌾 Fresh Produce</h1>
      <p style={{ textAlign: 'center' }}>Directly from our KisanMitraAAA farmers</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {products.map((product) => (
          <div key={product.productId} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center',
            backgroundColor: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '60px', margin: '10px 0' }}>{product.image}</div>
            <h3>{product.name}</h3>
            <p style={{ color: '#666' }}>From: {product.farmer}</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>
              ₹{product.price}/{product.unit}
            </p>
            <p>Stock: {product.stock} units</p>
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

export default Products;