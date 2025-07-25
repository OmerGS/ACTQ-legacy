import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle } from "lucide-react";
import { CustomAlert } from "@/components/global/CustomAlert";
import config from "@/config/appConfig";
import { useTranslation } from "@/hooks/useTranslation";

export function StepWelcome({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const [showAlert, setShowAlert] = useState(false);
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  return (
    <>
      <p className="text-center text-xl font-semibold mb-6">
        {t("signup.step-signup.3.welcome")}{" "}
        <span className="text-indigo-600">
          {firstName} {lastName}
        </span>{" "}
        !
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => setShowAlert(true)}
          variant="outline"
          className="flex-1 py-3 text-sm"
        >
          <AlertTriangle className="mr-2 w-4 h-4" />
          {t("signup.step-signup.3.notYou")}
        </Button>
        <Button
          className="flex-1 py-3 text-sm"
          onClick={() => alert(t("signup.step-signup.3.signupFinished"))}
        >
          {t("signup.step-signup.3.next")}
          <Check className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {showAlert && (
        <CustomAlert
          title={t("signup.step-signup.3.alertTitle")}
          message={t("signup.step-signup.3.alertMessage")}
          onConfirm={() => {
            setShowAlert(false);
            window.location.href = `mailto:${config.contactEmail}?subject=[${config.associationNameShort} APP] ACCOUNT ISSUE ${firstName} ${lastName}`;
          }}
          onCancel={() => setShowAlert(false)}
          confirmText={t("signup.step-signup.3.contact")}
          cancelText={t("signup.step-signup.3.cancel")}
        />
      )}
    </>
  );
}