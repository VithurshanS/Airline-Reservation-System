DROP PROCEDURE if exists handleAircraft;
DELIMITER $$
CREATE PROCEDURE handleAircraft(
   IN Comp VARCHAR(255),
   IN Airc VARCHAR(255),
   IN Ts INT,
   IN Eno INT,
   IN Bno INT,
   IN Pno INT
)
BEGIN
    DECLARE aircraft_count INT DEFAULT 0;
    DECLARE mes VARCHAR(255);
    select count(*) into aircraft_count from aircraft where Company = Comp and Aircraft_type = Airc;
    
    IF aircraft_count = 0 THEN
        INSERT INTO Aircraft (Company,Aircraft_type, Total_seats,Economy_seat_start_no,Business_seat_start_no,Platinum_seat_start_no) VALUES (Comp, Airc,Ts,Eno,Bno,Pno);
        SET mes = "Aircraft added successfully";
    ELSE
        SET mes = "Aircraft already exists";
    END IF;
    SELECT mes as message;
END $$

DELIMITER ;



drop procedure if exists addAddress;
DROP PROCEDURE addAddress;
DELIMITER $$
CREATE PROCEDURE addAddress(
    IN PLID INT,
    IN Ad VARCHAR(255)
)
BEGIN
    DECLARE address_count INT DEFAULT 0;
    DECLARE mes INT DEFAULT 1;
    DECLARE retaddress INT;
    select count(*) into address_count from Location where Address = ad;
    
    IF address_count = 0 THEN
        INSERT INTO Location (Parent_Location_ID, Address) VALUES (PLID, Ad);
        SELECT Location_ID INTO retaddress FROM Location where Address = ad;
    ELSE
        SET mes = 0;
        SELECT Location_ID INTO retaddress FROM Location where Address = ad;
    END IF;
    
    SELECT mes as message, retaddress as output_address;
END $$;
DELIMITER ;



drop procedure if exists getLocation;
DELIMITER $$
CREATE PROCEDURE getLocation(
    IN Loc_ID INT
)
BEGIN
    DECLARE ad VARCHAR(1000);
    DECLARE current_ID INT DEFAULT Loc_ID;
    DECLARE part VARCHAR(200) DEFAULT "";
    SELECT Parent_Location_ID,Address INTO current_ID,ad FROM LOCATION WHERE LOCATION_ID = current_ID;
    WHILE current_ID IS NOT NULL DO
        SELECT Address,Parent_Location_ID INTO part,current_ID FROM LOCATION WHERE Location_ID = current_ID;
        SET ad = CONCAT(ad,' , ',part);
    END WHILE;
    SELECT ad;
END $$;



DELIMITER ;