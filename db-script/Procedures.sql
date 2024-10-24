use AIRLINE;
------------------------------------------------------------------------------------------------
drop procedure if exists handleAircraft;
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


drop procedure if exists handleRouteadd;
DELIMITER $$
create Procedure handleRouteadd(
	IN DA CHAR(3),
    IN AA char(3)
)
BEGIN
	declare counti INT default 0;
    select count(*) into counti from route where Departure_Airport = DA and Arrival_Airport = AA;
    IF counti = 0 then
		INSERT into route (Departure_Airport,Arrival_Airport) values (DA,AA);
	END IF;
	select Route_ID from route where Departure_Airport = DA and Arrival_Airport = AA;
    
END $$;
DELIMITER ;




drop procedure if exists addAddress;
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



drop procedure if exists updateUserAges;

DELIMITER $$
CREATE PROCEDURE updateUserAges(
	IN UserID CHAR(36)
		
)
BEGIN
    UPDATE User
    SET Age = calculateAge(DOB)
    where User_ID = UserID;
END$$
DELIMITER ;



drop procedure if exists generateBookingsByCategoryReport;
DELIMITER $$
CREATE PROCEDURE generateBookingsByCategoryReport()
BEGIN
    SELECT 
        c.Category_Type,
        COUNT(b.Booking_ID) AS TotalBookings,
        SUM(b.Final_Price) AS TotalRevenue
    FROM 
        Booking b
    JOIN 
        User u ON b.User_ID = u.User_ID
    JOIN 
        User_Category uc ON u.User_ID = uc.User_ID
    JOIN 
        Category c ON uc.Category_ID = c.Category_ID
    WHERE 
        b.Booking_Status = 'confirmed'
    GROUP BY 
        c.Category_Type
    ORDER BY 
        TotalRevenue DESC;
END$$
DELIMITER ;

drop procedure if exists generatePopularRoutesReport;
DELIMITER $$
CREATE PROCEDURE generatePopularRoutesReport()
BEGIN
    SELECT 
        r.Route_ID,
        a1.Airport_name AS DepartureAirport,
        a2.Airport_name AS ArrivalAirport,
        COUNT(b.Booking_ID) AS TotalBookings
    FROM 
        Booking b
    JOIN 
        Seat s ON b.Seat_ID = s.Seat_ID
    JOIN 
        Schedule sc ON s.Schedule_ID = sc.Schedule_ID
    JOIN 
        Route r ON sc.Route_ID = r.Route_ID
    JOIN 
        Airport a1 ON r.Departure_Airport = a1.Airport_Code
    JOIN 
        Airport a2 ON r.Arrival_Airport = a2.Airport_Code
    WHERE 
        b.Booking_Status = 'confirmed'
    GROUP BY 
        r.Route_ID, a1.Airport_name, a2.Airport_name
    ORDER BY 
        TotalBookings DESC
    LIMIT 10;
END$$
DELIMITER ;


drop procedure if exists generateRevenueByAircraftReport;
CREATE PROCEDURE generateRevenueByAircraftReport()
BEGIN
    SELECT 
        a.Aircraft_type,
        COUNT(b.Booking_ID) AS TotalBookings,
        SUM(b.Final_Price) AS TotalRevenue
    FROM 
        Booking b
    JOIN 
        Seat s ON b.Seat_ID = s.Seat_ID
    JOIN 
        Schedule sc ON s.Schedule_ID = sc.Schedule_ID
    JOIN 
        Plane p ON sc.Plane_ID = p.Plane_ID
    JOIN 
        Aircraft a ON p.Aircraft_ID = a.Aircraft_ID
    WHERE 
        b.Booking_Status = 'confirmed'
    GROUP BY 
        a.Aircraft_type
    ORDER BY 
        TotalRevenue DESC
END$$
DELIMITER ;

use airline;

DROP PROCEDURE if exists InsertSeatsForSchedule;
DELIMITER $$

CREATE PROCEDURE InsertSeatsForSchedule(IN schedule_id CHAR(36))
BEGIN
    DECLARE total_seats INT;
    DECLARE economy_start INT;
    DECLARE business_start INT;
    DECLARE platinum_start INT;
    DECLARE seat_no INT;

    -- Get the Aircraft and seat details from Schedule and Aircraft tables in a single query
    SELECT a.Total_seats, a.Economy_seat_start_no, a.Business_seat_start_no, a.Platinum_seat_start_no
    INTO total_seats, economy_start, business_start, platinum_start
    FROM Aircraft a
    JOIN Plane p ON a.Aircraft_ID = p.Aircraft_ID
    JOIN Schedule s ON p.Plane_ID = s.Plane_ID
    WHERE s.Schedule_ID = schedule_id;

    -- Insert seats for economy class
    SET seat_no = economy_start;
    WHILE seat_no < business_start DO
        INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
        VALUES (UUID(), schedule_id, seat_no, 'economy', 'available');
        SET seat_no = seat_no + 1;
    END WHILE;

    -- Insert seats for business class
    SET seat_no = business_start;
    WHILE seat_no < platinum_start DO
        INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
        VALUES (UUID(), schedule_id, seat_no, 'business', 'available');
        SET seat_no = seat_no + 1;
    END WHILE;

    -- Insert seats for platinum class
    SET seat_no = platinum_start;
    WHILE seat_no <= total_seats DO
        INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
        VALUES (UUID(), schedule_id, seat_no, 'platinum', 'available');
        SET seat_no = seat_no + 1;
    END WHILE;

END$$

DELIMITER ;







drop procedure if exists addUser;
DELIMITER $$

CREATE PROCEDURE addUser(
    IN p_User_Name VARCHAR(200),
    IN p_First_name VARCHAR(200),
    IN p_Last_name VARCHAR(200),
    IN p_Email VARCHAR(200),
    IN p_DOB DATE,
    IN p_Gender VARCHAR(10),
    IN p_Password VARCHAR(255),
    IN p_Role  VARCHAR(50)
)
BEGIN
	DECLARE p_Age INT;
    SET p_Age = calculateAge(p_DOB);
    INSERT INTO User (User_ID, User_Name, First_name, Last_name, Email, DOB,Age, Gender, Password, Role) 
    VALUES (UUID(), p_User_Name, p_First_name, p_Last_name, p_Email, p_DOB,p_Age, p_Gender, p_Password, p_Role);
END$$

DELIMITER ;





