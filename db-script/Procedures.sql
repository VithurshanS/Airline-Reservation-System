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


DROP PROCEDURE if exists InsertSeatsForSchedule;
DELIMITER $$

CREATE PROCEDURE InsertSeatsForSchedule(IN schedule_id CHAR(36))
BEGIN
    DECLARE total_seats INT;
    DECLARE economy_start INT;
    DECLARE business_start INT;
    DECLARE platinum_start INT;
    DECLARE seat_no INT;
    
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



drop procedure if exists handleBooking;
DELIMITER $$
CREATE PROCEDURE handleBooking(
	IN p_Passenger_ID char(36),
    IN p_User_ID char(36),
    IN p_Seat_ID char(36)
)
BEGIN
	DECLARE actualPrice DECIMAL(10,2);
    DECLARE finalPrice DECIMAL(10,2);
    DECLARE discount DECIMAL(2,2);
    DECLARE class VARCHAR(255);
    DECLARE classname VARCHAR(255);
    DECLARE getpricequery TEXT;
    SELECT s.Seat_class into class from seat s where s.Seat_ID = p_Seat_ID;
    IF class = "economy" THEN
		SET classname = "Economy_Fare";
	ELSEIF class = "business" THEN
		SET classname = "Business_Fare";
	ELSE
		SET classname ="Platinum_Fare";
	END IF;
    SET @getpricequery = CONCAT('select ',classname,' into @ac from seat v left outer join schedule s on s.Schedule_ID = v.Schedule_ID where v.Seat_ID = ?;');
    PREPARE vi from @getpricequery;
    SET @p_Seat_ID = p_Seat_ID;
    EXECUTE vi USING @p_Seat_ID;
    DEALLOCATE PREPARE vi;
    SET actualPrice = @ac;
    IF p_User_ID is not null THEN
		select c.Discount into discount from category c right outer join user_category uc on uc.Category_ID = c.Category_ID where uc.User_ID = p_User_ID;
	ELSE
		SET discount = 0;
	END IF;
    SET finalPrice = calculateFinalamount(actualPrice,discount);
    INSERT INTO booking (Booking_ID,Passenger_ID,User_ID,final_Price,Booking_Status) 
    values (p_Seat_ID,p_Passenger_ID,p_User_ID,finalprice,"pending");
    
    
    
END$$
DELIMITER ;


drop procedure if exists bookseat;
DELIMITER $$
CREATE PROCEDURE bookseat(
	IN seatid CHAR(36)
)
BEGIN
    
    DECLARE useid CHAR(36);
    DECLARE bookingcount INT DEFAULT -1;
    DECLARE inistatus INT DEFAULT 0;
    SELECT COUNT(*) into inistatus from booking where  Booking_ID = seatid and Booking_Status = 'confirmed';
    IF inistatus = 0 THEN
		SELECT User_ID into useid from booking where Booking_ID = seatid;
		UPDATE booking set Booking_Status = 'confirmed' where Booking_ID = seatid;
		UPDATE seat set Seat_Status = 'booked' where Seat_ID = seatid;
		IF useid is not null THEN
			SELECT Bookings_count into bookingcount from user_category where User_ID = useid;
			UPDATE user_category set Bookings_count = (bookingcount + 1) where User_ID = useid;
		END IF;
	END IF;
END $$
DELIMITER ;


drop procedure if exists getscheduleafter;
DELIMITER $$
CREATE PROCEDURE getscheduleafter(
	IN indate date
)
BEGIN
	SELECT * FROM schedule where DATE(Departure_Time) >= indate;
END $$
DELIMITER ;


drop procedure if exists AddPassenger;
DELIMITER $$

CREATE PROCEDURE AddPassenger (
    IN p_Passenger_Name VARCHAR(255),
    IN p_Passport_Number VARCHAR(255),
    IN p_DOB DATE,
    IN p_Gender VARCHAR(10)
)
BEGIN
    DECLARE ID CHAR(36);
   -- DECLARE EXIT HANDLER FOR SQLEXCEPTION
    SELECT Passenger_ID INTO ID FROM Passenger WHERE Passport_Number = p_Passport_Number;
    IF ID IS NOT NULL THEN
        SELECT ID;
    ELSE
		-- BEGIN
			-- ROLLBACK;
		-- END;
		-- START TRANSACTION;
			INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, AGE, Gender)
			VALUES (UUID(), p_Passenger_Name, p_Passport_Number, p_DOB, calculateAge(p_DOB), p_Gender);
			SELECT Passenger_ID INTO ID FROM Passenger WHERE Passport_Number = p_Passport_Number;
		-- COMMIT;
        
        SELECT ID;
    END IF;
END $$

DELIMITER ;

drop procedure if exists getseatdetails;
DELIMITER $$
CREATE PROCEDURE getseatdetails(
	IN S_ID CHAR(36)
)
BEGIN
	DECLARE PI INT;
	BEGIN
		ROLLBACK;
	END;
	START TRANSACTION;
    SELECT Plane_ID into PI from schedule where Schedule_ID = S_ID;
	SELECT Total_seats,Economy_seat_start_no,Business_seat_start_no,Platinum_seat_start_no FROM aircraft right outer join plane ON plane.Aircraft_ID = aircraft.Aircraft_ID where plane.Plane_ID = PI;
	commit;
END $$

DELIMITER ;

drop procedure if exists addselectedseat;
DELIMITER $$
CREATE PROCEDURE addselectedseat(
    IN seatid char(36)
)
BEGIN
	UPDATE seat SET Seat_status = "selected" where Seat_ID = seatid;
END $$
DELIMITER ;

drop procedure if exists removeselectedseat;
DELIMITER $$
CREATE PROCEDURE removeselectedseat(
    IN seatid char(36)
)
BEGIN
	DECLARE currentstatus VARCHAR(10);
    SELECT Seat_status into currentstatus from seat where Seat_ID = seatid;
    IF currentstatus = "selected" then
		UPDATE seat SET Seat_status = "available" where Seat_ID = seatid;
	END IF;
    
END $$
DELIMITER ;


-- ---------------------------------------------------------------------------------------------------------
use AIRLINE;

drop procedure if exists getPassengersByAgeForFlight;
DELIMITER $$
CREATE PROCEDURE getPassengersByAgeForFlight(IN flight_no CHAR(36))
BEGIN
    SELECT 
        p.Passenger_ID,
        p.Passenger_Name,
        p.Passport_Number,
        p.DOB,
        p.AGE,
        p.Gender
    FROM 
        Booking b
    JOIN 
        Passenger p ON b.Passenger_ID = p.Passenger_ID
    JOIN 
        Seat s ON b.Seat_ID = s.Seat_ID
    WHERE 
        s.Schedule_ID = flight_no 
        AND b.Booking_Status = 'confirmed' 
        AND p.AGE < 18;

    SELECT 
        p.Passenger_ID,
        p.Passenger_Name,
        p.Passport_Number,
        p.DOB,
        p.AGE,
        p.Gender
    FROM 
        Booking b
    JOIN 
        Passenger p ON b.Passenger_ID = p.Passenger_ID
    JOIN 
        Seat s ON b.Seat_ID = s.Seat_ID
    WHERE 
        s.Schedule_ID = flight_no 
        AND b.Booking_Status = 'confirmed' 
        AND p.AGE >= 18;
END$$

DELIMITER ;

drop procedure if exists getPassengerCountByDestination;
DELIMITER $$
CREATE PROCEDURE getPassengerCountByDestination(
    IN startDate DATETIME,
    IN endDate DATETIME,
    IN destination VARCHAR(255)
)
BEGIN
    SELECT 
        COUNT(DISTINCT b.Passenger_ID) AS PassengerCount
    FROM 
        Booking b
    JOIN 
        Seat s ON b.Seat_ID = s.Seat_ID
    JOIN 
        Schedule sc ON s.Schedule_ID = sc.Schedule_ID
    JOIN 
        Route r ON sc.Route_ID = r.Route_ID
    JOIN 
        Airport a ON r.Arrival_Airport = a.Airport_Code
    WHERE 
        sc.Departure_Time BETWEEN startDate AND endDate
        AND a.Location_ID = destination
        AND b.Booking_Status = 'confirmed';
END$$

DELIMITER ;

drop procedure if exists getBookingsByPassengerCategory;
DELIMITER $$
CREATE PROCEDURE getBookingsByPassengerCategory(
    IN startDate DATETIME,
    IN endDate DATETIME
)
BEGIN
    SELECT 
        c.Category_Type,
        COUNT(b.Booking_ID) AS TotalBookings
    FROM 
        Booking b
    JOIN 
        User u ON b.User_ID = u.User_ID
    JOIN 
        User_Category uc ON u.User_ID = uc.User_ID
    JOIN 
        Category c ON uc.Category_ID = c.Category_ID
    JOIN 
        Seat s ON b.Seat_ID = s.Seat_ID
    JOIN 
        Schedule sc ON s.Schedule_ID = sc.Schedule_ID
    WHERE 
        sc.Departure_Time BETWEEN startDate AND endDate
        AND b.Booking_Status = 'confirmed'
    GROUP BY 
        c.Category_Type
    ORDER BY 
        TotalBookings DESC;
END$$

DELIMITER ;

drop procedure if exists getPastFlightsData;
DELIMITER $$
CREATE PROCEDURE getPastFlightsData(
    IN origin VARCHAR(5),
    IN destination VARCHAR(5)
)
BEGIN
    SELECT 
        sc.Schedule_ID,
        sc.Departure_Time,
        sc.Arrival_Time,
        COUNT(b.Booking_ID) AS PassengerCount
    FROM 
        Schedule sc
    JOIN 
        Route r ON sc.Route_ID = r.Route_ID
    JOIN 
        Seat s ON sc.Schedule_ID = s.Schedule_ID
    JOIN 
        Booking b ON s.Seat_ID = b.Seat_ID
    WHERE 
        r.Departure_Airport = origin
        AND r.Arrival_Airport = destination
        AND sc.Departure_Time < NOW()
        AND b.Booking_Status = 'confirmed'
    GROUP BY 
        sc.Schedule_ID, sc.Departure_Time, sc.Arrival_Time
    ORDER BY 
        sc.Departure_Time DESC;
END$$

DELIMITER ;

drop procedure if exists generateRevenueByAircraftReport;
DELIMITER $$ 
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
        TotalRevenue DESC;
END$$

DELIMITER ;

drop procedure if exists generateRevenueByAircraftReportbyid;
DELIMITER $$ 
CREATE PROCEDURE generateRevenueByAircraftReportbyid(
	IN aircraftid CHAR(36)
)
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
        b.Booking_Status = 'confirmed' and p.Aircraft_ID = aircraftid;
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




