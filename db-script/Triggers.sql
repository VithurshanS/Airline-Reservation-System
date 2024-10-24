
drop trigger if exists CheckScheduleOverlap;
DELIMITER $$

CREATE TRIGGER CheckScheduleOverlap
BEFORE INSERT ON Schedule
FOR EACH ROW
BEGIN
    DECLARE conflicting_schedules INT;

    -- Check for overlapping schedules for the same plane
    SELECT COUNT(*)
    INTO conflicting_schedules
    FROM Schedule s
    WHERE s.Plane_ID = NEW.Plane_ID
      AND (
            -- New schedule starts before an existing schedule ends and after an existing schedule starts
            (NEW.Departure_Time BETWEEN s.Departure_Time AND s.Arrival_Time)
            OR
            -- New schedule ends after an existing schedule starts and before it ends
            (NEW.Arrival_Time BETWEEN s.Departure_Time AND s.Arrival_Time)
            OR
            -- New schedule completely overlaps with an existing schedule
            (NEW.Departure_Time <= s.Departure_Time AND NEW.Arrival_Time >= s.Arrival_Time)
          );

    -- If there are conflicting schedules, raise an error
    IF conflicting_schedules > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: The plane is already scheduled for another route during the given time.';
    END IF;
END$$

DELIMITER ;

drop trigger if exists DeleteSeatsAfterSchedule;
DELIMITER $$

CREATE TRIGGER DeleteSeatsAfterSchedule
AFTER DELETE ON Schedule
FOR EACH ROW
BEGIN
    DELETE FROM Seat
    WHERE Schedule_ID = OLD.Schedule_ID;
END$$

DELIMITER ;

