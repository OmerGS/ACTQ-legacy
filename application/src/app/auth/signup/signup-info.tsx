'use client';

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { StepEmail } from "./Step/StepEmail";
import { StepEmailCode } from "./Step/StepEmailCode";
import { StepPassword } from "./Step/StepPassword";
import { StepBirthday } from "./Step/StepBirthday";
import { StepAddress } from "./Step/StepAddress";

export default function SignupInfo() {
  const [step, setStep] = useState(1);
  const { isReady } = useTranslation();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [addressFR, setAddressFR] = useState<string | null>(null);
  const [addressTR, setAddressTR] = useState<string | null>(null);

  if (!isReady) return null;

  const logAllData = () => {
    console.log("=== Données inscription ===");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Birthday:", birthday);
    console.log("Adresse FR:", addressFR);
    console.log("Adresse TR:", addressTR);
    console.log("===========================");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <StepEmail email={email} setEmail={setEmail} next={() => setStep(2)} />
      )}
      {step === 2 && (
        <StepEmailCode
          email={email}
          code={code}
          setCode={setCode}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <StepPassword
          password={password}
          confirmPassword={confirmPassword}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          next={() => setStep(4)}
          back={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <StepBirthday
          birthday={birthday}
          setBirthday={setBirthday}
          next={() => setStep(5)}
          back={() => setStep(3)}
        />
      )}
      {step === 5 && (
        <StepAddress
          country="FR"
          isRequired={true}
          setAddress={setAddressFR}
          next={(addr) => {
            setAddressFR(addr);
            setStep(6);
          }}
          back={() => setStep(4)}
        />
      )}
      {step === 6 && (
        <StepAddress
          country="TR"
          isRequired={false}
          setAddress={setAddressTR}
          next={(addr) => {
            setAddressTR(addr);
            logAllData();
          }}
          back={() => setStep(5)}
        />
      )}
    </div>
  );
}