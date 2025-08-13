import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/button/PasswordInput";
import { useState } from "react";

type StepPasswordProps = {
  password: string;
  confirmPassword: string;
  setPassword: (p: string) => void;
  setConfirmPassword: (p: string) => void;
  next: () => void;
  back: () => void;
};

export function StepPassword({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  next,
  back,
}: StepPasswordProps) {
  const [error, setError] = useState("");

  const handleNext = () => {
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setError("");
    next();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Sécurisez votre compte</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choisissez un mot de passe sécurisé pour votre nouveau compte.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            name="password"
            autoComplete="new-password"
            showStrength
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmez le mot de passe</Label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            name="confirmPassword"
            autoComplete="new-password"
            className="mt-1"
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-100 text-red-700 text-sm px-3 py-2">
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={back}>
          ← Retour
        </Button>
        <Button onClick={handleNext}>Suivant →</Button>
      </div>
    </div>
  );
}