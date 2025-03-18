"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import Spinner from '@/components/reusable/Spinner';
import { useMembre } from "../hooks/MemberContext";
import useAuth from '../hooks/useAuth';
import ServerConnection from '@/components/api/ServerConnection';
import Unauthorized from '@/components/reusable/Unauthorized';

const Uyeligim = () => {
  const router = useRouter();
  const { membre } = useMembre();
  const [loading, setLoading] = useState(false);
  const [aidatInformations, setAidatInformations] = useState<any[]>([]);
  const [AidatError, setAidatError] = useState<string | null>(null);
  const isAuthenticated = useAuth();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  useEffect(() => {
    const fetchAidatInformation = async () => {
    
      if (!membre) {
        return; 
      }
    
      try {
        const response = await ServerConnection.getCenazeFonuInformationForMember(membre.barcode, currentYear);
  
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
            <div className="profile-card">
                <p className="profile-info">
                {membre?.nom} {membre?.prenom} ({membre?.dateNaissance ? `${calculateAge(membre?.dateNaissance)} yaşında` : "Yaşınızı belirtmediniz !"})
                </p>
            </div>

            {/* Widget Cenaze Fonu */}
            <div className="widget">
                <h3>Cenaze Fonu</h3>
                <div className="sub-widget">
                <div className="widget-item">
                    <strong>Üyelik Durumum :</strong> {membre?.cenazeFonu === 1 ? "Cenaze Fonu üyesisiniz" : "Cenaze fonu üyesi değilsiniz"}
                </div>

                {membre?.cenazeFonu === 1 ? (
                    <>
                    <div className="widget-item">
                        <strong>{new Date().getFullYear()} Fiyat :</strong> {loading ? (
                        <p>Yükleniyor...</p>
                        ) : AidatError ? (
                        <p>{AidatError}</p>
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
                        ) : AidatError ? (
                        <p>{AidatError}</p>
                        ) : aidatInformations.length === 0 ? (
                        <p>Aidat verisi bulunamadı.</p>
                        ) : (
                        <span>{aidatInformations[0]?.amountDue - aidatInformations[0]?.amountPaid}€</span>
                        )}
                    </div>
                    </>
                ) : (
                    <div className="widget-item">
                        <button 
                        style={{
                            backgroundColor: "#32CD32",
                            color: "white",
                            fontWeight: "bold",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.3s"
                        }}
                        onClick={() => router.push('/misc/document')}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2ea62e"}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#32CD32"}
                        >
                        <FaDownload size={20} />
                        Üyelik Formunu İndirin
                        </button>
                    </div>
                )}
                </div>
            </div>
        </div>
    </div>
    )};
        
      

        <style jsx global>{`
          /* Lien Google Fonts pour Nunito */
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');

          .transactions-list {
            display: grid;
            grid-template-columns: 1fr; /* Par défaut : 1 colonne (mobile) */
            gap: 15px;
            margin-top: 20px;
          }

          .check-icon {
            color: green;
            font-size: 28px;
            margin-left: 10px;
            animation: checkAnimation 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
            transform-origin: center center;
          }

          @keyframes checkAnimation {
            0% {
              transform: scale(0) rotate(30deg);
              opacity: 0;
            }
            60% {
              transform: scale(1.1) rotate(-10deg);
              opacity: 1;
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
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
            border: 2px solid #32cd32;
            padding: 12px 20px;
            font-size: 18px;
            color: #32cd32;
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
            background-color: #32cd32;
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
            color: #32cd32;
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
            background-color: #32cd32;
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