export interface AppConfig {
  associationName: string;
  associationNameShort: string;
  contactEmail: string;
  logoUrl: string;
  primaryColor: string;
  [key: string]: any;
}

const config: AppConfig = {
  associationName: "Association Culturelle Turque de Quimper",
  associationNameShort: "ACTQ",
  contactEmail: "admin@actq.fr",
  logoUrl: "/logo.png",
  primaryColor: "#4f46e5",
};

export default config;