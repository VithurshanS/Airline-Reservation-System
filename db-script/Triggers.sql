drop trigger if exists AfterInsertSchedule;
DELIMITER $$

CREATE TRIGGER AfterInsertSchedule
AFTER INSERT ON Schedule
FOR EACH ROW
BEGIN
    CALL InsertSeatsForSchedule(NEW.Schedule_ID);
END $$

DELIMITER ;


drop trigger if exists CheckScheduleOverlap;
DELIMITER $$

CREATE TRIGGER CheckScheduleOverlap
BEFORE INSERT ON Schedule
FOR EACH ROW
BEGIN
    DECLARE conflicting_schedules INT;
    SELECT COUNT(*)
    INTO conflicting_schedules
    FROM Schedule s
    WHERE s.Plane_ID = NEW.Plane_ID
      AND (
            (NEW.Departure_Time BETWEEN s.Departure_Time AND s.Arrival_Time)
            OR
            (NEW.Arrival_Time BETWEEN s.Departure_Time AND s.Arrival_Time)
            OR
            (NEW.Departure_Time <= s.Departure_Time AND NEW.Arrival_Time >= s.Arrival_Time)
          );

    IF conflicting_schedules > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: The plane is already scheduled for another route during the given time.';
    END IF;
END$$

DELIMITER ;

drop trigger if exists addUsercategory;
DELIMITER $$
CREATE TRIGGER addusercategory
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    DECLARE catid INT;

    -- Initialize Category_ID based on initial conditions (RBC = 0)
    SELECT Category_ID INTO catid FROM category WHERE RBC = 0;

    -- Insert only if the new user is not an Admin
    IF NEW.Role != 'Admin' THEN
        INSERT INTO user_category (User_ID, Bookings_count, Category_ID) 
        VALUES (NEW.User_ID, 0, catid);
    END IF;
END $$
DELIMITER ;


drop trigger if exists Update_User_Category;
DELIMITER $$
CREATE TRIGGER Update_User_Category
BEFORE UPDATE ON user_category
FOR EACH ROW
BEGIN
    DECLARE new_category_id INT;

    -- Find the appropriate Category_ID based on the updated Bookings_count
    SELECT Category_ID
    INTO new_category_id
    FROM category
    WHERE NEW.Bookings_count >= RBC
    ORDER BY RBC DESC
    LIMIT 1;

    -- Update the NEW.Category_ID directly
    IF new_category_id IS NOT NULL THEN
        SET NEW.Category_ID = new_category_id;
    END IF;
END $$
DELIMITER ;






drop trigger if exists DeleteSeatsAfterSchedule;
DELIMITER $$

CREATE TRIGGER DeleteSeatsAfterSchedule
AFTER DELETE ON Schedule
FOR EACH ROW
BEGIN
	DELETE FROM booking
    WHERE Booking_ID = (SELECT Seat_ID from seat where Schedule_ID = OLD.Schedule_ID);
    DELETE FROM Seat
    WHERE Schedule_ID = OLD.Schedule_ID;
    
END$$

DELIMITER ;