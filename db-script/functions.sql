drop function if exists calculateAge;
DELIMITER $$
CREATE FUNCTION calculateAge(dateOfBirth DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN FLOOR(DATEDIFF(CURDATE(), dateOfBirth) / 365.25);
END$$
DELIMITER ;