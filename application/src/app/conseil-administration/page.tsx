"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Spinner from "@/components/reusable/Spinner";
import { FaArrowLeft } from 'react-icons/fa';

const YönetimKurulu = () => {
  const [üyeler, setÜyeler] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    fetch('/assets/json/administration-members.json')
      .then(response => response.json())
      .then(data => setÜyeler(data))
      .catch(error => console.error("Erreur lors du chargement des membres", error));
  }, []);

  const handleBack = () => {
    router.back(); 
  };

  if (!üyeler) {
    return <Spinner />;
  }

  const styles = {
    arrowBack: {
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 75,
        height: 50,
        position: 'absolute',
        top: '0px',
        left: '-5px',
        display: 'flex',
        cursor: 'pointer',
    },
    fleche: {
      fontSize: '25px',
      color: 'white',
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Roboto, sans-serif", backgroundColor: "#f0f0f0", color: "#333", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Bouton de retour avec flèche */}
      <div onClick={handleBack} style={styles.arrowBack}>
        <FaArrowLeft style={styles.fleche} />
      </div>

      <h1 style={{ marginBottom: "50px", fontSize: "2.5rem", color: "red", fontWeight: "bold", textAlign: "center" }}>Yönetim Kurulu</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px", width: "100%" }}>
        {Object.keys(üyeler).map((görev, index) => {
          const role = üyeler[görev];
          return (
            <div key={index} style={{ backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", padding: "20px", textAlign: "center", fontSize: "1.2rem", color: "#333" }}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ marginRight: "10px" }}>{role.icon}</span>
                <h3 style={{ fontSize: "1.5rem", color: "red", fontWeight: "bold", marginBottom: "10px" }}>{görev}</h3>
              </div>
              <div>
                {role.isimler.map((isim, subIndex) => (
                  <div key={subIndex} style={{ marginBottom: "5px" }}>
                    {isim}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YönetimKurulu;