"use client";

import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [method, setMethod] = useState<'sms' | 'email'>('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value as 'sms' | 'email');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (method === 'email') {
      console.log('Şifre sıfırlama e-postası gönderiliyor:', email);
    } else {
      console.log('Şifre sıfırlama SMS\'i gönderiliyor:', phoneNumber);
    }
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center' as const,
      margin: '0 auto',
    },
    title: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      color: '#333',
    },
    methodLabel: {
      display: 'block',
      marginBottom: '10px',
      color: '#555',
      fontWeight: '600',
    },
    methodSelect: {
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginBottom: '20px',
      backgroundColor: '#f8f8f8',
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#555',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      marginBottom: '20px',
      backgroundColor: '#f8f8f8',
    },
    submitBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#ff6f61',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1.1rem',
      cursor: 'pointer' as const,
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Şifre Sıfırlama</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="method" style={styles.methodLabel}>
          Yöntem Seçin:
        </label>
        <select
          id="method"
          value={method}
          onChange={handleMethodChange}
          style={styles.methodSelect}
        >
          <option value="email">E-posta</option>
          <option value="sms">SMS</option>
        </select>

        {method === 'email' ? (
          <div>
            <label htmlFor="email" style={styles.inputLabel}>
              E-posta Adresiniz
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.inputField}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="phoneNumber" style={styles.inputLabel}>
              Telefon Numaranız
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={styles.inputField}
            />
          </div>
        )}

        <button type="submit" style={styles.submitBtn}>
          Şifreyi Sıfırla
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;