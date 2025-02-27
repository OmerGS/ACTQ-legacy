"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Membre } from "@/components/interface/Membre";
import Spinner from '@/components/reusable/Spinner';

const Uyeligim = () => {
  const [membre, setMembre] = useState<Membre | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchedMembre = localStorage.getItem("user");
      if (fetchedMembre) {
        const membreObj = JSON.parse(fetchedMembre);

        if (membreObj.member && membreObj.member.dateNaissance) {
          const dateNaissance = new Date(membreObj.member.dateNaissance);
          dateNaissance.setDate(dateNaissance.getDate() + 1);
          const formattedDateNaissance = dateNaissance.toISOString().split('T')[0];
          membreObj.member.dateNaissance = formattedDateNaissance;
        }
        setMembre(membreObj.member);
      }
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Spinner />;
  }

  // Calcul de l'âge
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

  return (
    <div className="page-container">
      {/* Retour Button */}
      <button onClick={() => router.back()} className="back-button">
        <FaArrowLeft /> Geri
      </button>

      {/* Conteneur Principal */}
      <div className="main-container">
        {/* Sayin NOM PRENOM (AGE) */}
        <div className="profile-card">
          <p className="profile-info">{membre?.nom} {membre?.prenom} ({membre?.dateNaissance && calculateAge(membre?.dateNaissance)} yaşında)</p>
        </div>

        {/* Widget Bilgi (Date Naissance et Üye Numarası) */}
        <div className="widget">
          <h3>Bilgi</h3>
          <div className="sub-widget">
            <div className="widget-item">
              <strong>Doğum Tarihi :</strong> {membre?.dateNaissance}
            </div>
            <div className="widget-item">
              <strong>Üye Numarası :</strong> {membre?.barcode}
            </div>
          </div>
        </div>

        {/* Iritibat Widget */}
        <div className="widget">
          <h3>İletişim</h3>
          <div className="sub-widget">
            <div className="widget-item">
              <strong>Telefonu :</strong> {membre?.telephone}
            </div>
            <div className="widget-item">
              <strong>Email :</strong> {membre?.email}
            </div>
          </div>
        </div>

        {/* Adres Widget */}
        <div className="widget">
          <h3>Adresleriniz</h3>
          <div className="sub-widget">
            <div className="widget-item">
              <strong>Fransız Adresi :</strong> {membre?.adresseFr}
            </div>
            <div className="widget-item">
              <strong>Türk Adresi :</strong> {membre?.adresseTr}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Lien Google Fonts pour Nunito */
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');

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

        /* Irtibat Widget */
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