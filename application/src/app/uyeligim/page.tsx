"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '@/components/reusable/Spinner';
import { useMembre } from "../hooks/MemberContext";
import useAuth from '../hooks/useAuth';
import ServerConnection from '@/components/api/ServerConnection';
import Unauthorized from '@/components/reusable/Unauthorized';

const Uyeligim = () => {
  const router = useRouter();
  const { membre } = useMembre();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [aidatInformations, setAidatInformations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuth();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  useEffect(() => {
    if (isAuthenticated && membre) {
      if (membre.dateNaissance) {
        const dateNaissance = new Date(membre.dateNaissance);
        dateNaissance.setDate(dateNaissance.getDate() + 1); 
        const formattedDateNaissance = dateNaissance.toISOString().split('T')[0];
        membre.dateNaissance = formattedDateNaissance;
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, membre]);

  useEffect(() => {
    const fetchTransaction = async () => {
  
      if (!membre) {
        setError("Utilisateur non autorisé.");
        return; 
      }
  
      try {
        const response = await ServerConnection.getFilteredTransaction(membre.barcode, selectedYear);

        if (response.success) {
          setTransactions(response.transactions || []);
          setError(""); 
        } else {
          setTransactions([]); 
          setError(response.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
        setError("Une erreur est survenue lors de la récupération des transactions.");
      } 
    };
  
    if (membre) {
      fetchTransaction(); 
    }
  }, [membre, selectedYear]);

  useEffect(() => {
    const fetchAidatInformation = async () => {
    
      if (!membre) {
        return; 
      }
    
      try {
        const response = await ServerConnection.getAidatInformationForMember(membre.barcode, selectedYear);
  
        if (response.success) {
          setAidatInformations(response.data);
        } else {
          setAidatInformations([]); 
        }
      } catch (error) {
        console.error("Error fetching aidat information:", error);
        setAidatInformations([]);
      } 
    };
    
    if (membre) {
      fetchAidatInformation(); 
    }
  }, [membre, selectedYear]);

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth();
    if (month < birth.getMonth() || (month === birth.getMonth() && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  const formatDateWithSeconds = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      { !membre ? (
        <Unauthorized /> 
      ) : (
        <div className="page-container">
        {/* Retour Button */}
        <button onClick={() => router.back()} className="back-button">
          <FaArrowLeft /> Geri
        </button>

        {/* Conteneur Principal */}
        <div className="main-container">
          {/* Sayin NOM PRENOM (AGE) */}
          <div className="profile-card">
            <p className="profile-info">
              {membre?.nom} {membre?.prenom} ({membre?.dateNaissance ? `${calculateAge(membre?.dateNaissance)} yaşında` : "Yaşınızı belirtmediniz !"})
            </p>
          </div>

          {/* Widget Aidat */}
          <div className="widget">
            <h3>Aidat</h3>
            <div className="sub-widget">
              <div className="widget-item">
                <strong>Üyelik Durumum :</strong> {membre?.statut}
              </div>
              <div className="widget-item">
                <strong>{new Date().getFullYear()} Fiyat :</strong> {loading ? (
                  <p>Yükleniyor...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : aidatInformations.length === 0 ? (
                  <p>Aidat verisi bulunamadı.</p>
                ) : (
                  <span>{aidatInformations[0]?.amountDue}€</span>
                )}
              </div>
              <div className="widget-item">
                <strong>Kalan Ödeme Miktarı : </strong>
                {loading ? (
                  <p>Yükleniyor...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : aidatInformations.length === 0 ? (
                  <p>Aidat verisi bulunamadı.</p>
                ) : (
                  <span>{aidatInformations[0]?.amountDue - aidatInformations[0]?.amountPaid}€</span>
                )}
              </div>
            </div>
          </div>

          {/* Son Aidat Ödemeleri */}
          <div className="widget">
            <h3>{selectedYear} yılı ödemeleriniz</h3>

            {/* SELECTION D'ANNEE */}
            <div className="year-selector">
              {years.map((year) => (
                <button
                  key={year}
                  className={`year-btn ${selectedYear === year ? "active" : ""}`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>

            {loading ? (
              <p>Yükleniyor...</p>
            ) : error ? (
              <p>{error}</p>
            ) : transactions.length === 0 ? (
              <p>Henüz ödeme yapılmamış.</p>
            ) : (
              <div className="transactions-list">
                {transactions.slice().reverse().map((transaction, index) => (
                  <div key={index} className="transaction-widget">
                    <h4>{transaction.reason}</h4>
                    <div className="widget-item">
                      <strong>Fatura N° :</strong> {transaction.transactionId}
                    </div>
                    <div className="widget-item">
                      {transaction.makbuzId && (
                        <>
                          <strong>Makbuz N° :</strong> {transaction.makbuzId}
                        </>
                      )}
                    </div>
                    <div className="widget-item">
                      <strong>Ödeme Şekli :</strong> {transaction.paymentMethod}
                    </div>
                    <div className="widget-item">
                      <strong>Tarih :</strong> {formatDateWithSeconds(transaction.date)}
                    </div>
                    <div className="widget-item">
                      <strong>Onaylayan :</strong> {transaction.receiver}
                    </div>
                    <div className="widget-item">
                      <strong>Miktar :</strong> {transaction.amount}€
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


          {/* Widget Bilgi */}
          <div className="widget">
            <h3>Bilgileriniz</h3>
            <div className="sub-widget">
              <div className="widget-item">
                <strong>Doğum Tarihi :</strong> {membre?.dateNaissance ? formatDate(membre?.dateNaissance) : ""}
              </div>
              <div className="widget-item">
                <strong>Üye Numarası :</strong> {membre?.barcode}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}:
      

        <style jsx global>{`
          /* Lien Google Fonts pour Nunito */
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');

          .transactions-list {
            display: grid;
            grid-template-columns: 1fr; /* Par défaut : 1 colonne (mobile) */
            gap: 15px;
            margin-top: 20px;
          }

          .year-selector {
            display: flex;
            gap: 10px;
            margin-top: 10px;
            flex-wrap: wrap; /* Permet aux boutons de passer à la ligne si nécessaire */
            justify-content: center; /* Aligne les boutons au centre */
          }

          .year-btn {
            background-color: #f0f0f0;
            border: 2px solid #ddd;
            color: #555;
            padding: 8px 15px;
            font-size: 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 80px; /* Définit une largeur minimale pour chaque bouton */
            max-width: 100%; /* Empêche le bouton de dépasser */
            text-align: center;
          }

          .year-btn:hover {
            background-color: #ff6f61;
            color: white;
            border-color: #ff6f61;
          }

          .year-btn.active {
            background-color: #ff6f61;
            color: white;
            border-color: #ff6f61;
          }

          @media (max-width: 600px) {
            .year-btn {
              font-size: 0.9rem; /* Réduit la taille du texte sur mobile */
              padding: 6px 12px; /* Ajuste l'espacement interne des boutons */
            }
          }


          .transaction-widget {
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 0;
            box-sizing: border-box;
            word-wrap: break-word;
            width: 100%;
          }

          .widget-item {
            margin-bottom: 8px;
            font-size: 14px;
          }

          /* Tablette (≥ 600px) : 2 colonnes */
          @media (min-width: 600px) {
            .transactions-list {
              grid-template-columns: repeat(2, 1fr);
            }
          }



          /* Global Reset */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Nunito', sans-serif;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
            font-size: 16px;
          }

          /* Conteneur principal */
          .page-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            position: relative;
          }

          /* Bouton Retour */
          .back-button {
            background-color: transparent;
            border: 2px solid #ff6f61;
            padding: 12px 20px;
            font-size: 18px;
            color: #ff6f61;
            font-weight: bold;
            cursor: pointer;
            border-radius: 50px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 10;
          }

          .back-button:hover {
            background-color: #ff6f61;
            color: white;
          }

          .back-button svg {
            margin-right: 8px;
          }

          /* Conteneur Principal avec Alignement */
          .main-container {
            width: 100%;
            max-width: 800px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
            margin-top: 60px; /* Décalage pour éviter que le contenu se superpose au bouton */
          }

          /* Widget Bilgi */
          .widget {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 20px;
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
          }

          .widget h3 {
            color: #ff6f61;
            margin-bottom: 15px;
          }

          .sub-widget {
            display: flex;
            flex-direction: column;
          }

          .widget-item {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 10px;
          }

          .widget-item strong {
            font-weight: 600;
            color: #333;
          }

          /* Carte Profil */
          .profile-card {
            background-color: #ff6f61;
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 30px;
            color: white;
            text-align: center;
          }

          .profile-info {
            font-size: 1.6rem;
            font-weight: bold;
          }

          /* Mobile Responsiveness */
          @media (max-width: 600px) {
            .profile-info {
              font-size: 1.4rem;
            }

            .back-button {
              font-size: 16px;
              padding: 10px 15px;
            }

            .main-container {
              padding: 10px;
            }

            .widget-item {
              font-size: 1rem;
            }
          }
        `}</style>
      </div>
  );
};

export default Uyeligim;