"use client";

import ServerConnection from '@/components/api/ServerConnection';
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [method, setMethod] = useState<'sms' | 'email'>('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value as 'sms' | 'email');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('L\'adresse e-mail n\'est pas valide');
        return;
      }

      try {
        const response = await ServerConnection.resetPassword(email);

        if (response.ok) {
          alert('Un code de validation a été envoyé à votre email');
          setStep(2); // Passer à l'étape suivante
        } else {
          alert('Une erreur est survenue lors de l\'envoi de l\'email');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        alert('Une erreur est survenue');
      }
    } else {
      console.log('SMS envoyé au numéro:', phoneNumber);
      setStep(2);
    }
  };

  const handleCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Valider le code
    try {
      const response = await fetch('/api/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: validationCode }),
      });

      if (response.ok) {
        setStep(3);
      } else {
        alert('Le code de validation est incorrect');
      }
    } catch (error) {
      console.error('Erreur lors de la validation du code:', error);
      alert('Une erreur est survenue');
    }
  };

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        alert('Votre mot de passe a été changé avec succès');
      } else {
        alert('Une erreur est survenue lors du changement du mot de passe');
      }
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      alert('Une erreur est survenue');
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
      {step === 1 && (
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
      )}

      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <label htmlFor="validationCode" style={styles.inputLabel}>
            Kodunuzu Girin
          </label>
          <input
            type="text"
            id="validationCode"
            value={validationCode}
            onChange={(e) => setValidationCode(e.target.value)}
            required
            style={styles.inputField}
          />
          <button type="submit" style={styles.submitBtn}>
            Kodu Onayla
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordChange}>
          <label htmlFor="newPassword" style={styles.inputLabel}>
            Yeni Şifrenizi Girin
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.inputField}
          />
          <button type="submit" style={styles.submitBtn}>
            Şifreyi Değiştir
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;