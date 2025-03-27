use actq;

/*
DROP TABLE cenaze_fonu_history;
DROP TABLE cenaze_fonu_prices;
DROP TABLE AidatHistory;
DROP TABLE Aidat;
DROP TABLE Payment;
DROP TABLE sessions;
DROP TABLE Membre;
*/

-- Table Membre
CREATE TABLE Membre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  telephone VARCHAR(15) UNIQUE NOT NULL,
  barcode VARCHAR(20) UNIQUE,
  dateNaissance DATE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  salt VARCHAR(512),
  specialRole ENUM('sudo', 'admin', 'manager', 'operator', 'cashier', 'contributor'),
  aidatCategory ENUM('Genç', 'Normal', 'Emekli', 'Malulen Emekli', 'Şehir Dışı') NOT NULL,
  statut ENUM('Aktif', 'Donduruldu', 'Düştü', 'Üye Değil') NOT NULL DEFAULT 'Aktif',
  adresseFr VARCHAR(255),
  adresseTr VARCHAR(255),
  cenazeFonu BOOLEAN NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expired_at TIMESTAMP NULL,
    ip_address VARCHAR(45),
    device_info VARCHAR(255),
    last_login DATETIME,
    FOREIGN KEY (user_id) REFERENCES Membre(id)
);

-- Table Payment
CREATE TABLE Payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reason ENUM('Aidat', 'Bağış', 'Cenaze Fonu', 'Diğer') NOT NULL,
  year INT NOT NULL,
  paymentMethod ENUM('Nakit', 'Kart', 'Banka Havalesi', 'Çek', 'Diğer') NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  transactionId VARCHAR(20) UNIQUE,
  receiverId INT NOT NULL,
  FOREIGN KEY (memberId) REFERENCES Membre(id) ON DELETE CASCADE
);

CREATE TABLE cenaze_fonu_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE cenaze_fonu_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    year INT NOT NULL,
    amountPaid DECIMAL(10,2) DEFAULT 0,
    lastPaymentDate TIMESTAMP NULL,
    FOREIGN KEY (memberId) REFERENCES Membre(id) ON DELETE CASCADE,
    UNIQUE(memberId, year)
);

-- Table Aidat
CREATE TABLE Aidat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  UNIQUE(category)
);

CREATE TABLE AidatHistory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    category ENUM('Genç', 'Normal', 'Emekli', 'Malulen Emekli', 'Şehir Dışı') NOT NULL,
    year INT NOT NULL,
    amountDue DECIMAL(10,2) NOT NULL,
    amountPaid DECIMAL(10,2) DEFAULT 0,
    lastPaymentDate TIMESTAMP NULL,
    FOREIGN KEY (memberId) REFERENCES Membre(id) ON DELETE CASCADE,
    UNIQUE(memberId, year)
);