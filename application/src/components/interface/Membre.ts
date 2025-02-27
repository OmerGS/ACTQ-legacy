export interface Membre {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  barcode: string;
  dateNaissance: string;
  email: string;
  password: string;
  salt: string;
  statusSpecial: string;
  statut: string;
  adresseFr: number;
  adresseTr: number;
}