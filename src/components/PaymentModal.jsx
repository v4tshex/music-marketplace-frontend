import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onPaymentSuccess, song, songType = 'spotify' }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const price = 0.99; // Fixed price for all tracks

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      email: ''
    });
    setErrors({});
    setIsProcessing(false);
  };

  const validateForm = () => {
    const newErrors = {};

    // Card number validation (simple check for 16 digits)
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation (3 digits)
    if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }

    // Cardholder name validation
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    // Email validation
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.replace(/\s/g, '').length > 16) return;
    }

    // Format expiry date (add slash after 2 digits)
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
    }

    // CVV - only allow 3 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      // Simulate successful payment
      onPaymentSuccess({
        paymentId: `PAY_${Date.now()}`,
        amount: price,
        currency: 'GBP',
        cardLast4: formData.cardNumber.slice(-4),
        timestamp: new Date().toISOString()
      });
      
      resetForm();
      onClose();
      setIsProcessing(false);
    }, 2000);
  };

  const handleClose = () => {
    if (!isProcessing) {
      resetForm();
      onClose();
    }
  };

  if (!isOpen) return null;

  const getSongTitle = () => {
    if (songType === 'user') {
      return song?.title || 'Unknown Track';
    }
    return song?.name || 'Unknown Track';
  };

  const getArtistName = () => {
    if (songType === 'user') {
      return song?.artist || 'Unknown Artist';
    }
    return song?.track_artists?.map(ta => ta.artist?.name).filter(Boolean).join(', ') || 'Unknown Artist';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          borderBottom: '1px solid #333',
          paddingBottom: '15px'
        }}>
          <h2 style={{
            margin: 0,
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            Complete Purchase
          </h2>
          <button
            onClick={handleClose}
            disabled={isProcessing}
            style={{
              background: 'none',
              border: 'none',
              color: '#aaa',
              fontSize: '24px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              padding: '5px',
              opacity: isProcessing ? 0.5 : 1
            }}
          >
            ×
          </button>
        </div>

        {/* Song Information */}
        <div style={{
          backgroundColor: '#111',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          <h3 style={{
            margin: '0 0 10px 0',
            color: '#ffffff',
            fontSize: '18px'
          }}>
            {getSongTitle()}
          </h3>
          <p style={{
            margin: '0 0 15px 0',
            color: '#ccc',
            fontSize: '14px'
          }}>
            by {getArtistName()}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #333',
            paddingTop: '15px'
          }}>
            <span style={{ color: '#aaa', fontSize: '14px' }}>
              Single Track Purchase
            </span>
            <span style={{
              color: '#007bff',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              £{price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          {/* Card Number */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: `1px solid ${errors.cardNumber ? '#ff4444' : '#444'}`,
                borderRadius: '6px',
                backgroundColor: '#222',
                color: '#ffffff',
                outline: 'none',
                opacity: isProcessing ? 0.6 : 1
              }}
            />
            {errors.cardNumber && (
              <p style={{ color: '#ff4444', fontSize: '12px', margin: '5px 0 0 0' }}>
                {errors.cardNumber}
              </p>
            )}
          </div>

          {/* Expiry Date and CVV */}
          <div style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: `1px solid ${errors.expiryDate ? '#ff4444' : '#444'}`,
                  borderRadius: '6px',
                  backgroundColor: '#222',
                  color: '#ffffff',
                  outline: 'none',
                  opacity: isProcessing ? 0.6 : 1
                }}
              />
              {errors.expiryDate && (
                <p style={{ color: '#ff4444', fontSize: '12px', margin: '5px 0 0 0' }}>
                  {errors.expiryDate}
                </p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: `1px solid ${errors.cvv ? '#ff4444' : '#444'}`,
                  borderRadius: '6px',
                  backgroundColor: '#222',
                  color: '#ffffff',
                  outline: 'none',
                  opacity: isProcessing ? 0.6 : 1
                }}
              />
              {errors.cvv && (
                <p style={{ color: '#ff4444', fontSize: '12px', margin: '5px 0 0 0' }}>
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: `1px solid ${errors.cardholderName ? '#ff4444' : '#444'}`,
                borderRadius: '6px',
                backgroundColor: '#222',
                color: '#ffffff',
                outline: 'none',
                opacity: isProcessing ? 0.6 : 1
              }}
            />
            {errors.cardholderName && (
              <p style={{ color: '#ff4444', fontSize: '12px', margin: '5px 0 0 0' }}>
                {errors.cardholderName}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: `1px solid ${errors.email ? '#ff4444' : '#444'}`,
                borderRadius: '6px',
                backgroundColor: '#222',
                color: '#ffffff',
                outline: 'none',
                opacity: isProcessing ? 0.6 : 1
              }}
            />
            {errors.email && (
              <p style={{ color: '#ff4444', fontSize: '12px', margin: '5px 0 0 0' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Disclaimer */}
          <div style={{
            backgroundColor: '#2a2a0f',
            border: '1px solid #555500',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '25px'
          }}>
            <p style={{
              margin: 0,
              color: '#ffeb3b',
              fontSize: '12px',
              lineHeight: '1.4'
            }}>
              <strong>University Project Notice:</strong> This is a dummy payment simulation. 
              No real money will be charged and no actual payment processing will occur. 
              This is for educational purposes only.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={handleClose}
              disabled={isProcessing}
              style={{
                padding: '12px 24px',
                border: '1px solid #444',
                borderRadius: '6px',
                backgroundColor: '#333',
                color: '#ffffff',
                fontSize: '14px',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.5 : 1,
                transition: 'background-color 0.2s ease'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: isProcessing ? '#555' : '#007bff',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Processing...
                </>
              ) : (
                `Pay £${price.toFixed(2)}`
              )}
            </button>
          </div>
        </form>

        {/* CSS Animation for spinner */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default PaymentModal;

