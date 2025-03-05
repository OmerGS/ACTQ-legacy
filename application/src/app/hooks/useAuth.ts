"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMembre } from "./MemberContext";

const useAuth = () => {
  const router = useRouter();
  const { membre, getMembre } = useMembre();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembre = async () => {
      try {
        await getMembre();
        if (membre === null) {
          setIsAuthenticated(false);
          console.log("Utilisateur non authentifié, membre null");
        } else {
          setIsAuthenticated(true);
          console.log("Utilisateur authentifié", membre);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du membre', error);
        setIsAuthenticated(false);
        console.log("Erreur lors de la récupération du membre");
      } finally {
        setLoading(false);
      }
    };

    fetchMembre();
  }, []); 
  return isAuthenticated;
};

export default useAuth;