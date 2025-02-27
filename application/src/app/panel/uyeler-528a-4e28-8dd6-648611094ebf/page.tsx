import React from 'react';

const UyelerPage = () => {
  return (
    <div style={styles.pageContainer}>
      <p style={styles.text}>Dernek Uyeler Listesi</p>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  text: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default UyelerPage;
