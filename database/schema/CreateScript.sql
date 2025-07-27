use actq;

-- =====================
-- 1. Roles and Permissions
-- =====================
CREATE TABLE Role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(100),
  description TEXT
);

CREATE TABLE Permission (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(100),
  description TEXT
);

CREATE TABLE RolePermission (
  roleId INT,
  permissionId INT,
  PRIMARY KEY (roleId, permissionId),
  FOREIGN KEY (roleId) REFERENCES Role(id),
  FOREIGN KEY (permissionId) REFERENCES Permission(id)
);

-- =====================
-- 2. Members
-- =====================
CREATE TABLE Member (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  phone VARCHAR(15) UNIQUE,
  barcode VARCHAR(20) UNIQUE,
  birthDate DATE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  salt VARCHAR(512),
  roleId INT,
  specialStatus ENUM('Retired', 'Student'),
  status ENUM('Active', 'Frozen', 'Left', 'NonMember') NOT NULL DEFAULT 'Active',
  addressFR VARCHAR(255),
  addressTR VARCHAR(255),
  funeralFund BOOLEAN NOT NULL DEFAULT FALSE,
  profilePictureUrl VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (roleId) REFERENCES Role(id)
);

-- =====================
-- 3. Member Sessions
-- =====================
CREATE TABLE Session (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  refreshToken VARCHAR(512) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  expiredAt TIMESTAMP NULL,
  ipAddress VARCHAR(45),
  deviceInfo VARCHAR(255),
  lastLogin DATETIME,
  FOREIGN KEY (memberId) REFERENCES Member(id)
);

-- =====================
-- 4. Contribution Categories (Aidat)
-- =====================
CREATE TABLE Contribution (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  UNIQUE(category, year)
);

-- =====================
-- 5. Annual Contribution per Member
-- =====================
CREATE TABLE ContributionHistory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  category VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  amountDue DECIMAL(10,2) NOT NULL,
  amountPaid DECIMAL(10,2) DEFAULT 0,
  lastPaymentDate TIMESTAMP NULL,
  isFullyPaid BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (memberId) REFERENCES Member(id),
  UNIQUE(memberId, year)
);

-- =====================
-- 6. Payments
-- =====================
CREATE TABLE Payment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reason ENUM('Contribution', 'Donation', 'FuneralFund', 'Other') NOT NULL,
  year INT NOT NULL,
  method ENUM('Cash', 'Card', 'BankTransfer', 'Check', 'Other') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transactionId VARCHAR(50) UNIQUE,
  receivedBy INT NOT NULL,
  FOREIGN KEY (memberId) REFERENCES Member(id),
  FOREIGN KEY (receivedBy) REFERENCES Member(id)
);

-- =====================
-- 7. Funeral Fund Rules and History
-- =====================
CREATE TABLE FuneralFund (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year INT NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL
);

CREATE TABLE FuneralFundHistory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  year INT NOT NULL,
  amountPaid DECIMAL(10,2) DEFAULT 0,
  lastPaymentDate TIMESTAMP NULL,
  FOREIGN KEY (memberId) REFERENCES Member(id),
  UNIQUE(memberId, year)
);

-- =====================
-- 8. Annual Receipts
-- =====================
CREATE TABLE AnnualReceipt (
  id INT AUTO_INCREMENT PRIMARY KEY,
  memberId INT NOT NULL,
  year INT NOT NULL,
  issuedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  issuedBy INT NOT NULL,
  notes TEXT,
  FOREIGN KEY (memberId) REFERENCES Member(id),
  FOREIGN KEY (issuedBy) REFERENCES Member(id),
  UNIQUE(memberId, year)
);

-- =====================
-- 9. Documents (PDF etc.)
-- =====================
CREATE TABLE Document (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  fileUrl VARCHAR(255) NOT NULL,
  year INT,
  category ENUM('Form', 'Regulation', 'GeneralAssembly', 'Other') DEFAULT 'Other',
  active BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- 10. Social Links
-- =====================
CREATE TABLE SocialLink (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(50),
  url VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  position INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- 11. App Settings
-- =====================
CREATE TABLE Settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  keyName VARCHAR(100) UNIQUE NOT NULL,
  value VARCHAR(255) NOT NULL,
  description TEXT,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================
-- 12. Announcements (pop-ups)
-- =====================
CREATE TABLE Announcement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Poll (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  isAnonymous BOOLEAN DEFAULT FALSE,
  isMultipleChoice BOOLEAN DEFAULT FALSE,
  createdBy INT NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy) REFERENCES Member(id)
);

CREATE TABLE PollOption (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pollId INT NOT NULL,
  optionText VARCHAR(255) NOT NULL,
  FOREIGN KEY (pollId) REFERENCES Poll(id)
);

CREATE TABLE PollVote (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pollId INT NOT NULL,
  optionId INT NOT NULL,
  memberId INT, -- NULL si anonyme
  votedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pollId) REFERENCES Poll(id),
  FOREIGN KEY (optionId) REFERENCES PollOption(id),
  FOREIGN KEY (memberId) REFERENCES Member(id),
  UNIQUE (pollId, memberId, optionId) -- Empêche de voter plusieurs fois pour la même option
);

CREATE TABLE verification_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  method ENUM('email', 'phone') NOT NULL,
  target VARCHAR(255) NOT NULL,
  code_hash VARCHAR(255) NOT NULL,
  purpose ENUM(
    'identity_verification', 
    'signup', 
    'password_reset', 
    'email_change', 
    'phone_change'
  ) NOT NULL,
  action_context JSON DEFAULT NULL,
  expires_at DATETIME NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES Member(id) ON DELETE CASCADE
);