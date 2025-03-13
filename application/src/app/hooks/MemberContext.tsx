"use client"

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { Membre } from '@/components/interface/Membre';
import BACKEND_API from '@/properties/BACKEND_API';
import Spinner from "@/components/reusable/Spinner";

interface MembreContextType {
  membre: Membre | null;
  setMembre: (membre: Membre | null) => void;
  getMembre: () => Promise<void>;
}

const MembreContext = createContext<MembreContextType | undefined>(undefined);

export const MembreProvider = ({ children }: { children: ReactNode }) => {
  const [membre, setMembre] = useState<Membre | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getMembre = async () => {
      try {
        const response = await axios.get(`${BACKEND_API.baseURL}/auth/me`, { withCredentials: true });
        if (response.data) {
          setMembre(response.data);
        } else {
          setMembre(null);       
        }
      } catch (error) {
        console.log('Erreur lors de la récupération du membre');
        setMembre(null);
      }
    };  

    useEffect(() => {
      getMembre();
    }, []);

  return (
    <MembreContext.Provider value={{ membre, setMembre, getMembre }}>
      {loading ? <Spinner></Spinner> : children}
    </MembreContext.Provider>
  );
};

export const useMembre = (): MembreContextType => {
  const context = useContext(MembreContext);
  if (!context) {
    throw new Error('useMembre must be used within a MembreProvider');
  }
  return context;
};