"use client";

import ServerConnection from '@/components/api/ServerConnection';
import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [method, setMethod] = useState<'sms' | 'email'>('email');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [step, setStep] = useState<1 | 2>(1);

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value as 'sms' | 'email');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("E-posta adresiniz geçerli değil");
        return;
      }

      try {
        const response = await ServerConnection.sendMailVerificationCode(email);

        if (response.success) {
          alert('Geçerlilik kodu e-posta adresinize gönderildi');
          setStep(2);
        } else {
          alert("E-posta gönderilirken bir hata oluştu");
        }
      } catch (error) {
        console.error("E-posta gönderme hatası:", error);
        alert("Bir hata oluştu");
      }
    } else {
      try {
        const response = await ServerConnection.sendVerificationCode(phoneNumber);

        if (response.success) {
          alert('Geçerlilik kodu telefon numaranıza gönderildi');
          setStep(2);
        } else {
          alert("SMS gönderilirken bir hata oluştu");
        }
      } catch (error) {
        console.error("SMS gönderme hatası:", error);
        alert("Bir hata oluştu");
      }
    }
  };

  const handleCodeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(method == "email"){
      try {
        const response = await ServerConnection.checkVerificationCodeEmail(email, validationCode);
  
        if (response) {
          generateLink();
        } else {
          alert('Geçerlilik kodu yanlış');
        }
      } catch (error) {
        console.error('Kod doğrulama hatası:', error);
        alert('Bir hata oluştu');
      }
    } else if (method == "sms") {
      try {
        const response = await ServerConnection.checkVerificationCode(phoneNumber, validationCode);
  
        if (response) {
          generateLink();
        } else {
          alert('Kod yanlış');
        }
      } catch (error) {
        console.error('Kod doğrulama hatası:', error);
        alert('Bir hata oluştu');
      }
    }
  };

  const generateLink = () => {
    alert(method + " ile link gönderildi.");
    ServerConnection.generateLink(email || phoneNumber, method);
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#333' }}>Şifre Sıfırlama</h2>
      {step === 1 && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="method" style={{ display: 'block', marginBottom: '10px', color: '#555', fontWeight: '600' }}>
            Yöntem Seçin:
          </label>
          <select id="method" value={method} onChange={handleMethodChange} style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '20px', backgroundColor: '#f8f8f8' }}>
            <option value="email">E-posta</option>
            <option value="sms">SMS</option>
          </select>

          {method === 'email' ? (
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                E-posta Adresiniz
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '20px', backgroundColor: '#f8f8f8' }} />
            </div>
          ) : (
            <div>
              <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Telefon Numaranız
              </label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '20px', backgroundColor: '#f8f8f8' }} />
            </div>
          )}

          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1.1rem', cursor: 'pointer' }}>
            Şifreyi Sıfırla
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleCodeSubmit}>
          <label htmlFor="validationCode" style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
            Kodunuzu Girin
          </label>
          <input type="text" id="validationCode" value={validationCode} onChange={(e) => setValidationCode(e.target.value)} required style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '20px', backgroundColor: '#f8f8f8' }} />
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1.1rem', cursor: 'pointer' }}>
            Kodu Onayla
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;