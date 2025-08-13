import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type StepBirthdayProps = {
  birthday: string;
  setBirthday: (b: string) => void;
  next: () => void;
  back: () => void;
};

export function StepBirthday({
  birthday,
  setBirthday,
  next,
  back,
}: StepBirthdayProps) {
  const handleNext = () => {
    if (!birthday) {
      alert("Veuillez entrer votre date de naissance.");
      return;
    }
    next();
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="birthday">Date de naissance</Label>
      <Input
        id="birthday"
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />

      <div className="flex justify-between gap-2">
        <Button variant="secondary" onClick={back}>
          Retour
        </Button>
        <Button onClick={handleNext}>Suivant</Button>
      </div>
    </div>
  );
}