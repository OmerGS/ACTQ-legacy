"use client";

import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { FaCreditCard, FaHandHoldingHeart, FaRegHeart, FaCoins, FaArrowLeft } from 'react-icons/fa';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f4e1d2 0%, #e0c3fc 100%)',
    padding: '20px',
    fontFamily: 'Nunito, sans-serif',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  card: {
    width: '80%',
    maxWidth: '400px',
    padding: '40px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    borderRadius: '16px',
    backgroundColor: 'white',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
    border: '1px solid #D1D1D6',
  } as React.CSSProperties,
  title: {
    fontSize: '30px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#1C1C1E',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  button: {
    width: '100%',
    padding: '18px',
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
  },
  buttonAidat: {
    backgroundColor: '#007AFF',
  },
  buttonCenaze: {
    backgroundColor: '#34C759',
  },
  buttonBagis: {
    backgroundColor: '#FF9500',
  },
  icon: {
    fontSize: '28px',
    color: 'white',
  },
  backButton: {
    marginTop: '30px',
    width: '100%',
    padding: '16px',
    fontSize: '18px',
    fontWeight: '600',
    backgroundColor: '#FF3B30',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
  },
};

export default function Paiements() {
  const router = useRouter();

  const handlePaymentRedirect = (paymentType: string) => {
    const message = `Şu anda ${paymentType} için ödeme yapacaksınız. Ödeme işlemi için harici bir siteye yönlendirileceksiniz.`;

    if (window.confirm(message)) {
      let paymentUrl;
      switch (paymentType) {
        case 'Aidat':
          paymentUrl = 'https://pay.sumup.com/b2c/QINT10R0';
          break;
        case 'Cenaze Fonu':
          paymentUrl = 'https://link-to-payment.com/cenaze';
          break;
        case 'Bağış':
          paymentUrl = 'https://pay.sumup.com/b2c/QRXCYU0L';
          break;
        default:
          return;
      }
      window.location.href = paymentUrl;
    }
  };

  return (
    <div style={styles.container}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={styles.card}>
        <h1 style={styles.title}>Ödeme Yap</h1>
        <div style={styles.buttons}>
          <button 
            style={{ ...styles.button, ...styles.buttonAidat }} 
            onClick={() => handlePaymentRedirect('Aidat')}
          >
            <FaCreditCard style={styles.icon} /> Aidat
          </button>
          <button 
            style={{ ...styles.button, ...styles.buttonCenaze }} 
            onClick={() => handlePaymentRedirect('Cenaze Fonu')}
          >
            <FaCoins style={styles.icon}/> Cenaze Fonu
          </button>
          <button 
            style={{ ...styles.button, ...styles.buttonBagis }} 
            onClick={() => handlePaymentRedirect('Bağış')}
          >
            <FaHandHoldingHeart style={styles.icon}/> Bağış
          </button>
        </div>
        <button style={styles.backButton} onClick={() => router.back()}>
          <FaArrowLeft style={styles.icon}/> Geri
        </button>
      </motion.div>
    </div>
  );
}
