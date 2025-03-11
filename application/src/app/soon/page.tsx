"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const ComingSoonPage = () => {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Bu Özellik Geliştirme Aşamasında,
        Yakında Kullanıma Sunulacak!
      </h1>
      <button 
        onClick={() => router.back()} 
        style={styles.button}>
        Geri Dön
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right,rgba(51, 3, 3, 0.64),rgba(32, 32, 31, 0.74))',
    fontFamily: 'Nunito, sans-serif',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
  } as React.CSSProperties,
  header: {
    fontSize: '30px',
    marginBottom: '20px',
    fontWeight: '600',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#FFD700',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#FFA500',
  }
};

export default ComingSoonPage;