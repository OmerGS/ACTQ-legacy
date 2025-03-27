use actq;

/* 
Add the date of a payment into a payment.
*/
DROP TRIGGER IF EXISTS before_payment_insert

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