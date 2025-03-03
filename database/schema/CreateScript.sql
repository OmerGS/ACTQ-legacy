use actq;

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS HistoriqueStatut;
DROP TABLE IF EXISTS Payment;
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
  statusSpecial ENUM('Emekli', 'Ögrenci'),
  statut ENUM('Actif', 'Dondurdu', 'Çikti') NOT NULL DEFAULT 'Actif',
  adresseFr VARCHAR(255),
  adresseTr VARCHAR(255)
);

-- Table HistoriqueStatut
CREATE TABLE HistoriqueStatut (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membre_id INT NOT NULL,
  statutPrecedent ENUM('Actif', 'Suspendu', 'Parti') NOT NULL,
  statutActuel ENUM('Actif', 'Suspendu', 'Parti') NOT NULL,
  dateChangement TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (membre_id) REFERENCES Membre(id) ON DELETE CASCADE,
  CHECK (statutPrecedent <> statutActuel)
);

-- Table Payment
CREATE TABLE Payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reason ENUM('Aidat', 'Bağış', 'Cenaze Fonu', 'Diğer') NOT NULL,
  year INT NOT NULL,
  paymentMethod ENUM('Nakit', 'Kart', 'Banka Havalesi', 'Çek', 'Diğer') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transactionId VARCHAR(20) UNIQUE,
  notes TEXT,
  FOREIGN KEY (memberId) REFERENCES Membre(id) ON DELETE CASCADE
);

-- Table Aidat
CREATE TABLE Aidat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category ENUM('Genç', 'Normal', 'Emekli') NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  UNIQUE(category)
);

DELIMITER //
CREATE TRIGGER before_payment_insert
BEFORE INSERT ON Payment
FOR EACH ROW
BEGIN
  IF NEW.transactionId IS NULL THEN
    SET NEW.transactionId = CONCAT(DATE_FORMAT(NOW(), '%Y%m%d%H%i%s'), '-', LPAD(FLOOR(RAND() * 10000), 4, '0'));
  END IF;
END;

//
DELIMITER ;