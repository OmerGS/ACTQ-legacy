use actq;

/* 
Empêcher de dépasser le total dû pour Cenaze Fonu.
*/
DROP TRIGGER IF EXISTS prevent_full_payment_cenaze;

DELIMITER //

CREATE TRIGGER prevent_full_payment_cenaze
BEFORE INSERT ON Payment
FOR EACH ROW
BEGIN
    DECLARE total_paid DECIMAL(10,2);
    DECLARE yearly_price DECIMAL(10,2);
    
    -- Vérifier si le paiement concerne le 'Cenaze Fonu'
    IF NEW.reason = 'Cenaze Fonu' THEN
        
        -- Récupérer le montant total déjà payé par le membre pour l'année concernée
        SELECT COALESCE(SUM(amountPaid), 0)
        INTO total_paid
        FROM cenaze_fonu_history
        WHERE memberId = NEW.memberId AND year = NEW.year;
        
        -- Récupérer le prix fixé pour l'année concernée
        SELECT price
        INTO yearly_price
        FROM cenaze_fonu_prices
        WHERE year = NEW.year;
        
        -- Vérifier si le paiement dépasserait le montant requis
        IF total_paid + NEW.amount > yearly_price THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Cenaze Fonu ödemesi bu yıl için ödenmesi gereken tutarı aşıyor';
        END IF;
    END IF;
END
//
DELIMITER ;



/* 
Mettre à jour les paiements Cenaze Fonu dans l'historique.
*/
/* 
Mettre à jour les paiements Cenaze Fonu dans l'historique.
*/
DROP TRIGGER IF EXISTS update_cenaze_payment;

DELIMITER //
CREATE TRIGGER update_cenaze_payment
AFTER INSERT ON Payment
FOR EACH ROW
BEGIN
    IF NEW.reason = 'Cenaze Fonu' THEN
        IF NOT EXISTS (SELECT 1 FROM Membre WHERE id = NEW.memberId AND cenazeFonu = 1) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Le membre n\'est pas inscrit au Cenaze Fonu.';
        ELSE
            IF EXISTS (SELECT 1 FROM cenaze_fonu_history WHERE memberId = NEW.memberId AND year = NEW.year) THEN
                UPDATE cenaze_fonu_history
                SET amountPaid = amountPaid + NEW.amount, lastPaymentDate = NOW()
                WHERE memberId = NEW.memberId AND year = NEW.year;
            ELSE
                INSERT INTO cenaze_fonu_history (memberId, year, amountDue, amountPaid, lastPaymentDate)
                SELECT 
                    NEW.memberId, 
                    NEW.year,  
                    cfp.price, 
                    NEW.amount, 
                    NOW()
                FROM cenaze_fonu_prices cfp
                WHERE cfp.year = NEW.year;
            END IF;
        END IF;
    END IF;
END //
DELIMITER ;



/* 
Supprimer un paiement Cenaze Fonu de l'historique.
*/
DROP TRIGGER IF EXISTS delete_cenaze_payment;

DELIMITER //
CREATE TRIGGER delete_cenaze_payment
AFTER DELETE ON Payment
FOR EACH ROW
BEGIN
    IF OLD.reason = 'Cenaze Fonu' THEN
        IF EXISTS (SELECT 1 FROM cenaze_fonu_history WHERE memberId = OLD.memberId AND year = OLD.year) THEN
            UPDATE cenaze_fonu_history
            SET amountPaid = GREATEST(amountPaid - OLD.amount, 0)
            WHERE memberId = OLD.memberId AND year = OLD.year;
        END IF;
    END IF;
END //
DELIMITER ;















CALL addCenazeFonu(2025, 80);
DROP PROCEDURE IF EXISTS addCenazeFonu;

DELIMITER //

CREATE PROCEDURE addCenazeFonu(IN year INT, IN price DECIMAL(10,2))
BEGIN
    IF EXISTS (
        SELECT 1
        FROM cenaze_fonu_history ch
        WHERE ch.year = year
        AND ch.amountPaid > price
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bir üye, yeni fiyatın üzerinde bir tutar ödediği için fiyat güncellemesi yapılamaz.';
    ELSE
        IF EXISTS (
            SELECT 1
            FROM cenaze_fonu_prices
            WHERE year = year
        ) THEN
            UPDATE cenaze_fonu_prices
            SET price = price
            WHERE year = year;
        
        ELSE
            INSERT INTO cenaze_fonu_prices (year, price)
            VALUES (year, price);

            INSERT INTO cenaze_fonu_history (memberId, year, amountPaid, lastPaymentDate)
            SELECT 
                m.id,
                year,
                0,
                NOW()
            FROM Membre m
            WHERE m.cenazeFonu = 1;
        END IF;
    END IF;
END //

DELIMITER ;