use airline;
drop function if exists calculateAge;
DELIMITER $$
CREATE FUNCTION calculateAge(dateOfBirth DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN FLOOR(DATEDIFF(CURDATE(), dateOfBirth) / 365.25);
END$$
DELIMITER ;

drop function if exists calculateFinalamount;
DELIMITER $$
CREATE FUNCTION calculateFinalamount(actualPrice DECIMAL(10,2),discount DECIMAL(2,2))
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
	RETURN (actualPrice*(1-discount));
END$$
DELIMITER ;

