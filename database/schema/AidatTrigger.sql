use actq;

/* 
Prevent to exced the total of aidat.
*/
DROP TRIGGER IF EXISTS prevent_full_payment_aidat;

DELIMITER //
CREATE TRIGGER prevent_full_payment_aidat
BEFORE INSERT ON Payment
FOR EACH ROW
BEGIN
    DECLARE total_paid DECIMAL(10,2);
    DECLARE total_due DECIMAL(10,2);

    IF NEW.reason = 'Aidat' THEN
        SELECT amountDue INTO total_due
        FROM AidatHistory
        WHERE memberId = NEW.memberId
        AND year = NEW.year;

        IF total_due IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Aucun montant dû trouvé pour cette année';
        END IF;

        SELECT COALESCE(SUM(amount), 0)
        INTO total_paid
        FROM Payment
        WHERE memberId = NEW.memberId
        AND reason = 'Aidat'
        AND year = NEW.year;

        IF total_paid + NEW.amount > total_due THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Aidat ödemesi bu yıl için ödenmesi gereken tutarı aşıyor.';
        END IF;
    END IF;
END //
DELIMITER ;






/*
-----------------------------------------------------------------------------------------------------
*/


/* 
Add the payment if it's aidat in AidatHistory.
*/
DROP TRIGGER IF EXISTS update_aidat_payment;

DELIMITER //
CREATE TRIGGER update_aidat_payment
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    IF NEW.reason = 'Aidat' THEN
        -- Vérifie si l'enregistrement existe déjà dans AidatHistory
        IF EXISTS (SELECT 1 FROM AidatHistory WHERE memberId = NEW.memberId AND year = NEW.year) THEN
            -- Mise à jour du paiement dans AidatHistory
            UPDATE AidatHistory
            SET amountPaid = amountPaid + NEW.amount, lastPaymentDate = NOW()
            WHERE memberId = NEW.memberId AND year = NEW.year;
        ELSE
            -- Insérer un nouvel enregistrement si inexistant
            INSERT INTO AidatHistory (memberId, category, year, amountDue, amountPaid, lastPaymentDate)
            SELECT 
                NEW.memberId, 
                m.aidatCategory, 
                NEW.year,  -- Utilise NEW.year provenant de Payment
                a.price, 
                NEW.amount, 
                NOW()
            FROM Membre m
            JOIN Aidat a ON m.aidatCategory = a.category 
            WHERE m.id = NEW.memberId;
        END IF;
    END IF;
END //
DELIMITER ;




DROP TRIGGER IF EXISTS delete_aidat_payment;

DELIMITER //
CREATE TRIGGER delete_aidat_payment
AFTER DELETE ON Payment
FOR EACH ROW
BEGIN
    IF OLD.reason = 'Aidat' THEN
        IF EXISTS (SELECT 1 FROM AidatHistory WHERE memberId = OLD.memberId AND year = OLD.year) THEN
            UPDATE AidatHistory
            SET amountPaid = GREATEST(amountPaid - OLD.amount, 0)  -- Empêche amountPaid d'être négatif
            WHERE memberId = OLD.memberId AND year = OLD.year;
        END IF;
    END IF;
END //
DELIMITER ;






/*
-----------------------------------------------------------------------------------------------------
*/


/* 
Create AidatHistory for the selected year.
*/
CALL GenerateAidatForNewYear(2025);
DROP PROCEDURE IF EXISTS GenerateAidatForNewYear;

DELIMITER //

CREATE PROCEDURE GenerateAidatForNewYear(IN newYear INT)
BEGIN
    INSERT INTO AidatHistory (memberId, category, year, amountDue, amountPaid, lastPaymentDate)
    SELECT 
        m.id, 
        CASE 
            WHEN m.aidatCategory = 'Genç' AND m.dateNaissance IS NOT NULL 
                 AND TIMESTAMPDIFF(YEAR, m.dateNaissance, CURDATE()) >= 26 THEN 'Normal'
            ELSE m.aidatCategory
        END AS category, 
        newYear, 
        CASE 
            WHEN m.statut IN ('Donduruldu', 'Düştü') THEN 0
            ELSE a.price 
        END, 
        0, 
        NULL
    FROM Membre m
    LEFT JOIN Aidat a ON m.aidatCategory = a.category
    WHERE NOT EXISTS (
        SELECT 1 FROM AidatHistory ah WHERE ah.memberId = m.id AND ah.year = newYear
    );
END //

DELIMITER ;






/* 
Register the user automaticaly into AidatHistory
*/
DROP TRIGGER IF EXISTS after_member_insert;

DELIMITER //

CREATE TRIGGER after_member_insert
AFTER INSERT ON Membre
FOR EACH ROW
BEGIN
    DECLARE currentYear INT;
    SET currentYear = YEAR(CURDATE());

    INSERT INTO AidatHistory (memberId, category, year, amountDue, amountPaid, lastPaymentDate)
    SELECT 
        NEW.id, 
        CASE 
            WHEN NEW.aidatCategory = 'Genç' AND NEW.dateNaissance IS NOT NULL 
                 AND TIMESTAMPDIFF(YEAR, NEW.dateNaissance, CURDATE()) >= 26 THEN 'Normal'
            ELSE NEW.aidatCategory
        END AS category, 
        currentYear, 
        CASE 
            WHEN NEW.statut IN ('Üye Değil', 'Donduruldu', 'Düştü') THEN 0
            ELSE COALESCE(a.price, 0) 
        END, 
        0, 
        NULL
    FROM Aidat a
    WHERE a.category = NEW.aidatCategory;
END //

DELIMITER ;
