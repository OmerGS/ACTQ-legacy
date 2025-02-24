use actq;

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS HistoriqueStatut;
DROP TABLE IF EXISTS Cotisation;
DROP TABLE IF EXISTS RolePermission;
DROP TABLE IF EXISTS Permission;
DROP TABLE IF EXISTS MembreRole;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS Membre;

-- Table Membre
CREATE TABLE Membre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  telephone VARCHAR(15) UNIQUE,
  barcode VARCHAR(20) UNIQUE,
  dateNaissance DATE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  salt VARCHAR(512),
  statusSpecial ENUM('Retraite', 'Etudiant'),
  statut ENUM('Actif','Suspendu', 'Parti') NOT NULL DEFAULT 'Actif'
);

-- Table HistoriqueStatut (suivi des changements de statut des membres)
CREATE TABLE HistoriqueStatut (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membre_id INT NOT NULL,
  statutPrecedent ENUM('Actif', 'Suspendu', 'Parti') NOT NULL,
  statutActuel ENUM('Actif', 'Suspendu', 'Parti') NOT NULL,
  dateChangement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (membre_id) REFERENCES Membre(id) ON DELETE CASCADE,
  CHECK (statutPrecedent <> statutActuel)
);

-- Table Cotisation (Anciennement "Aidat" : Paiements des membres)
CREATE TABLE Cotisation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membre_id INT NOT NULL,
  montant DECIMAL(10,2) NOT NULL,
  annee YEAR NOT NULL,
  datePaiement DATE NOT NULL,
  moyenPaiement ENUM('Carte', 'Virement', 'Chèque', 'Espèces', 'En ligne') NOT NULL,
  etatPaiement ENUM('Payé', 'En attente', 'Annulé') NOT NULL DEFAULT 'En attente',
  FOREIGN KEY (membre_id) REFERENCES Membre(id) ON DELETE CASCADE
);

-- Table Role (Gestion des rôles des membres)
CREATE TABLE Role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomRole ENUM('Membre', 'Modérateur', 'Administrateur', 'Conseil Administration') UNIQUE NOT NULL,
  description TEXT
);

-- Table Permission (Liste des permissions possibles)
CREATE TABLE Permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomPermission VARCHAR(100) UNIQUE NOT NULL,
  description TEXT
);

-- Table RolePermission (Associe les rôles et les permissions)
CREATE TABLE RolePermission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES Permission(id) ON DELETE CASCADE,
  UNIQUE (role_id, permission_id)
);

-- Table MembreRole (Associe les membres à des rôles)
CREATE TABLE MembreRole (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membre_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (membre_id) REFERENCES Membre(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES Role(id) ON DELETE CASCADE,
  UNIQUE (membre_id, role_id) -- Un membre ne peut pas avoir deux fois le même rôle
);
