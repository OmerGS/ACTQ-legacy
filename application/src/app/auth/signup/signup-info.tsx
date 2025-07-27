import { useSignupContext } from "./SignupProvider";

export default function SignupInfo() {
  const { phone, firstname, lastname } = useSignupContext();

  return (
    <div>
      <p>Numéro vérifié : {phone}</p>
      <p>Nom : {lastname}</p>
      <p>Prénom : {firstname}</p>
    </div>
  );
}