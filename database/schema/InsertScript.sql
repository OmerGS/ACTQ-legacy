use actq;
SELECT * FROM Membre;

DELETE From Membre WHERE id = 269;
SELECT * FROM Membre WHERE id = 111;

SELECT * FROM Payment;

INSERT INTO Payment (memberId, reason, year, paymentMethod, amount, notes)
VALUES (269, 'Aidat', 2025, 'Kart', 100.50, 'Market');

INSERT INTO Payment (memberId, reason, year, paymentMethod, amount, notes)
VALUES (269, 'Cenaze Fonu', 2024, 'Nakit', 200, 'Lokal');

INSERT INTO Aidat (category, price) 
VALUES 
  ('Genç', 100.00),  
  ('Normal', 240.00),  
  ('Emekli', 100.00);