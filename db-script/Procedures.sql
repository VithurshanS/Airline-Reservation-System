DELIMITER $$

CREATE PROCEDURE handleLogin(
    IN username VARCHAR(200),
    IN pass VARCHAR(10),
    OUT mes INT
)
BEGIN
    DECLARE user_count INT DEFAULT 0;
    DECLARE is_passCorrect INT DEFAULT 0;

    select count(*) into user_count from User where User_Name = username;
    if user_count = 0 then 
        set mes = 404;
    else
        select count(*) into is_passCorrect from user where (User_Name,Password) = (username,pass);
        if is_passCorrect = 0 then
            set mes = 304;
        else
            set mes = 201;
            select * from user where (User_Name,Password) = (username,pass);

        end if;
    end if;
end $$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE handleSignin(
    IN username

)

DELIMITER;  


DELIMITER $$
CREATE PROCEDURE handleRouteadd(
    IN Depature_Airport VARCHAR(5),
    IN Arival_Airport VARCHAR(5),
)
BEGIN
    DECLARE route_count INT DEFAULT 0;
    SELECT COUNT(*) INTO route_count FROM route WHERE Depature_Airport = Depature_Airport AND Arival_Airport = Arival_Airport;
    IF route_count = 0 THEN
        INSERT INTO route (Deature_Airport, Arival_Airport) VALUES (Deature_Airport, Arival_Airport);
    END IF;
END $$

DELIMITER ;

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

//`INSERT INTO User (User_ID,;User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role)


