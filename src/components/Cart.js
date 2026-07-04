import React, { useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Tomatoes', price: 40, quantity: 2 },
    { id: 2, name: 'Onions', price: 35, quantity: 1 }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const placeOrder = () => {
    const orderId = 'KISAN' + Date.now();
    alert(`✅ Order placed successfully!\nOrder ID: ${orderId}\nTotal: ₹${total}\n\nThank you for choosing KisanMitraAAA!`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2E7D32' }}>🛒 Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
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
                <h3>{item.name}</h3>
                <p>₹{item.price} x {item.quantity}</p>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>₹{item.price * item.quantity}</span>
              </div>
            </div>
          ))}
          
          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#E8F5E9',
            borderRadius: '10px'
          }}>
            <h2>Total: ₹{total}</h2>
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
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;