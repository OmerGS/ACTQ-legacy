"use client";

import React, { createContext, useContext, useState } from "react";

type SignupContextType = {
  phone: string;
  setPhone: (value: string) => void;
  firstname: string;
  setFirstname: (value: string) => void;
  lastname: string;
  setLastname: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [code, setCode] = useState("");

  return (
    <SignupContext.Provider
      value={{
        phone,
        setPhone,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        code,
        setCode,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};