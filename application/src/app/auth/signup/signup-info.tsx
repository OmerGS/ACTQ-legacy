import { useSignupContext } from "./SignupProvider";

export default function SignupInfo() {
  const { phone, name, lastname, setName, setLastname } = useSignupContext();

  return (
    <div>
      <p>Numéro vérifié : {phone}</p>
      <input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Prénom"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
    </div>
  );
}