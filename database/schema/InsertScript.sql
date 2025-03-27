use actq;
SELECT * FROM Membre;
SELECT * FROM Payment;
SELECT * FROM sessions;
SELECT * FROM AidatHistory;
SELECT * FROM Aidat;
SELECT * FROM cenaze_fonu_history;
SELECT * FROM cenaze_fonu_prices;

DELETE From Membre WHERE id = 255;
SELECT * FROM Membre WHERE id = 255;

UPDATE Membre
SET aidatCategory = "Genç"
WHERE id = 255;

INSERT INTO Aidat (category, price) 
VALUES 
  ('Genç', 100.00),  
  ('Normal', 240.00),  
  ('Emekli', 100.00),
  ('Malulen Emekli', 100.00),
  ('Şehir Dışı', 100.00);