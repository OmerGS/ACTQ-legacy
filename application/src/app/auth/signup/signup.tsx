'use client';

import { useState } from "react";
import { SignupSteps } from "./Step/SignupStep";
import { StepPhone } from "./Step/StepPhone";
import { StepCode } from "./Step/StepCode";
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
  const { phone, setPhone, code, setCode, firstname, lastname } = useSignupContext();

  if (!isReady) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-indigo-700 to-blue-600 px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t(`signup.title`)}</h1>

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
          <StepCode
            phone={phone}
            code={code}
            setCode={setCode}
            setStep={setStep}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {step === 3 && !showInfo && (
          <StepWelcome
            firstName={firstname}
            lastName={lastname}
            onNext={() => setShowInfo(true)}
          />
        )}

        {step === 3 && showInfo && <SignupInfo />}
      </div>
    </main>
  );
}