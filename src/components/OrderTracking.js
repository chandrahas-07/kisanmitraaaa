import React, { useState } from 'react';

function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const trackOrder = () => {
    if (!orderId) {
      alert('Please enter an Order ID');
      return;
    }
    // Sample tracking status
    setOrderStatus({
      id: orderId,
      status: 'Out for Delivery 🚚',
      estimatedDelivery: '2 hours',
      updates: [
        '✅ Order Confirmed',
        '🔄 Packing in Progress',
        '🚚 Out for Delivery'
      ]
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2E7D32' }}>📦 Track Your Order</h1>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter Order ID (e.g., KISAN123456)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            flex: 1,
            padding: '12px',
            border: '2px solid #4CAF50',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <button 
          onClick={trackOrder}
          style={{
            padding: '12px 25px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Track
        </button>
      </div>

      {orderStatus && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#F5F5F5',
          borderRadius: '10px'
        }}>
          <h3>Order: {orderStatus.id}</h3>
          <h2 style={{ color: '#2E7D32' }}>{orderStatus.status}</h2>
          <p>Estimated Delivery: {orderStatus.estimatedDelivery}</p>
          
          <div style={{ marginTop: '20px' }}>
            <h4>Updates:</h4>
            {orderStatus.updates.map((update, index) => (
              <p key={index} style={{ margin: '5px 0' }}>{update}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTracking;