"use client";

import { useEffect, useState } from "react";
import { fetchMembreInfo } from "@/components/controller/firstTimeConnection";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [membre, setMembre] = useState<any>(null);

  useEffect(() => {
    const savedPhoneNumber = localStorage.getItem("userPhoneNumber");
    setPhoneNumber(savedPhoneNumber);
  }, []);

  useEffect(() => {
    const handleFetchUser = async () => {
      if (!phoneNumber) return;
      try {
        const membreInfo = await fetchMembreInfo(phoneNumber);
        setMembre(membreInfo);
      } catch (error) {
        console.error("Erreur lors de la récupération des infos du membre:", error);
      }
    };

    if (phoneNumber) {
      handleFetchUser();
    }
  }, [phoneNumber]);

  return (
    <div>
      {phoneNumber ? (
        <div>
          <p>Numéro de téléphone enregistré : {phoneNumber}</p>
          {membre ? (
            <pre>{JSON.stringify(membre, null, 2)}</pre>
          ) : (
            <p>Chargement des informations du membre...</p>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Hesabınızı oluşturmanız gerekiyor</h2>
          <p>Bu sayfaya erişmek için önce bir hesap oluşturmalısınız.</p>
          <p>Lütfen kaydolun veya giriş yapın.</p>
        </div>
      )}
    </div>
  );
}
