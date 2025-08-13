import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type StepAddressProps = {
  country: "FR" | "TR";
  isRequired: boolean;
  setAddress: (value: string | null) => void;
  next: (value: string | null) => void;
  back: () => void;
};

export function StepAddress({
  country,
  isRequired,
  setAddress,
  next,
  back,
}: StepAddressProps) {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");

  const handleNext = () => {
    if (!line1.trim() || !line2.trim() || !city.trim()) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const formattedAddress = `${line1}, ${line2}, ${city}`;

    setAddress(formattedAddress);
    console.log("Adresse:", formattedAddress);
    next(formattedAddress);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-2xl">{country === "FR" ? "🇫🇷" : "🇹🇷"}</span>
        <span>Adresse</span>
      </div>

      <Field
        label="Numéro et rue"
        value={line1}
        onChange={setLine1}
        placeholder={country === "FR" ? "10 Rue de Londres" : "123 Atatürk Caddesi"}
      />
      <Field
        label={country === "FR" ? "Code postal" : "Code postal (5 chiffres)"}
        value={line2}
        onChange={setLine2}
        placeholder={country === "FR" ? "75000" : "34000"}
      />
      <Field
        label={country === "FR" ? "Ville" : "Province"}
        value={city}
        onChange={setCity}
        placeholder={country === "FR" ? "Paris" : "İstanbul"}
      />

      <div className="flex justify-between gap-2 mt-4">
        <Button variant="secondary" onClick={back}>
          Retour
        </Button>
        <div className="flex gap-2">
          {!isRequired && (
            <Button
              variant="outline"
              onClick={() => {
                setAddress(null);
                next(null);
              }}
            >
              Ignorer
            </Button>
          )}
          <Button onClick={handleNext}>Suivant</Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}