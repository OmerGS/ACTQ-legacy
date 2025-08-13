'use client';

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFromSetup } from "@/services/authAPI";
import { SignupSteps } from "./Step/SignupStep";
import { StepPhone } from "./Step/StepPhone";
import { StepPhoneCode } from "./Step/StepPhoneCode";
import { StepWelcome } from "./Step/StepWelcome";
import SignupInfo from "./signup-info";
import { useTranslation } from "@/hooks/useTranslation";
import { useSignupContext } from "./SignupProvider";

export type Step = 1 | 2 | 3;

export default function Signup() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { t, isReady } = useTranslation();
  const { phone, setPhone, setFirstname, setLastname } = useSignupContext();
  const [code, setCode] = useState("");

  const { data: setupUser, isSuccess } = useQuery({
    queryKey: ['setupUser'],
    queryFn: getUserFromSetup,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && setupUser && step !== 3) {
      setPhone(setupUser.phone);
      setFirstname(setupUser.firstname);
      setLastname(setupUser.lastname);
      setStep(3);
      setShowInfo(true);
    }
  }, [isSuccess, setupUser, step, setPhone, setFirstname, setLastname]);

  if (!isReady) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-indigo-700 to-blue-600 px-4 py-10">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl p-12 border border-gray-200">
        <h1 className="text-4xl font-semibold text-gray-900 text-center mb-12 tracking-wide">
          {t(`signup.index.title`)}
        </h1>

        <SignupSteps step={step} />

        {step === 1 && (
          <StepPhone
            phone={phone}
            setPhone={setPhone}
            setStep={setStep}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {step === 2 && (
          <StepPhoneCode
            phone={phone}
            code={code}
            setCode={setCode}
            setStep={setStep}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {step === 3 && !showInfo && (
          <StepWelcome onNext={() => setShowInfo(true)} />
        )}

        {step === 3 && showInfo && <SignupInfo />}
      </div>
    </main>
  );
}