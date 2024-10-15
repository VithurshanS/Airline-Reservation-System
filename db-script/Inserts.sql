-- Aircraft_type
INSERT INTO Aircraft_type (Aircraft_ID, AircraftType, Fuel_capacity)
VALUES 
(1, 'Boeing 747', 183380),
(2, 'Airbus A380', 320000),
(3, 'Boeing 777', 181283),
(4, 'Airbus A350', 141000),
(5, 'Embraer E195', 12900);

-- Plane
INSERT INTO Plane (Plane_ID, Aircraft_ID, Plane_name, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no)
VALUES 
(101, 1, 'BA123', 300, 1, 201, 251),
(102, 2, 'AA345', 400, 1, 301, 351),
(103, 3, 'UA567', 350, 1, 251, 301),
(104, 4, 'DA789', 275, 1, 151, 201),
(105, 5, 'QA901', 150, 1, 101, 121);

-- Passenger
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender)
VALUES 
(1, 'John Doe', 'A123456789', '1990-01-15', 'registered_user'),
(2, 'Jane Smith', 'B987654321', '1985-07-30', 'registered_user'),
(3, 'Michael Johnson', 'C567890123', '1975-09-12', 'registered_user'),
(4, 'Emily Davis', 'D678901234', '1992-05-24', 'Admin'),
(5, 'Robert Brown', 'E345678901', '1980-11-11', 'registered_user');

-- Address
INSERT INTO Address (Location_ID, Parent_Location_ID, Address)
VALUES 
(UUID(), NULL, '123 Main St, New York, NY'),
(UUID(), NULL, '456 Elm St, Los Angeles, CA'),
(UUID(), NULL, '789 Oak St, Chicago, IL'),
(UUID(), NULL, '101 Maple St, Dallas, TX'),
(UUID(), NULL, '202 Pine St, Miami, FL');

-- Airport
INSERT INTO Airport (Airport_Code, Airport_name, Location_ID)
VALUES 
('JFK', 'John F. Kennedy International Airport', UUID()),
('LAX', 'Los Angeles International Airport', UUID()),
('ORD', 'O\'Hare International Airport', UUID()),
('DFW', 'Dallas/Fort Worth International Airport', UUID()),
('MIA', 'Miami International Airport', UUID());

-- Route
INSERT INTO Route (Route_ID, Depature_Airport, Arival_Airport)
VALUES 
(1, 'JFK', 'LAX'),
(2, 'LAX', 'ORD'),
(3, 'ORD', 'DFW'),
(4, 'DFW', 'MIA'),
(5, 'MIA', 'JFK');

-- Category (corrected to 'Category')
INSERT INTO Catergory (Catergory_ID, Catergory_Type, Discount)
VALUES 
(1, 'normal', 0.00),
(2, 'frequent', 0.10),
(3, 'gold', 0.20),
(4, 'frequent', 0.15),
(5, 'gold', 0.25);

-- Schedule
INSERT INTO Schedule (Schedule_ID, Route_ID, Plane_ID, Depature_Time, Arival_Time, Economy_Fare, Business_Fare, Platinum_Fare, Status)
VALUES 
(UUID(), 1, 101, '2024-10-16 08:00:00', '2024-10-16 11:00:00', 300.00, 500.00, 700.00, 'on time'),
(UUID(), 2, 102, '2024-10-17 09:00:00', '2024-10-17 12:30:00', 350.00, 550.00, 750.00, 'delayed'),
(UUID(), 3, 103, '2024-10-18 10:00:00', '2024-10-18 13:15:00', 320.00, 520.00, 720.00, 'on time'),
(UUID(), 4, 104, '2024-10-19 11:00:00', '2024-10-19 14:30:00', 310.00, 510.00, 710.00, 'cancelled'),
(UUID(), 5, 105, '2024-10-20 12:00:00', '2024-10-20 15:45:00', 340.00, 540.00, 740.00, 'on time');

-- Seat
INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Is_available)
VALUES 
(UUID(), UUID(), 1, 'economy', TRUE),
(UUID(), UUID(), 2, 'business', TRUE),
(UUID(), UUID(), 3, 'platinum', FALSE),
(UUID(), UUID(), 4, 'economy', TRUE),
(UUID(), UUID(), 5, 'business', FALSE);

-- User_Category
INSERT INTO User_Category (User_ID, Bookings_count, Catergory_ID)
VALUES 
(UUID(), 10, 1),
(UUID(), 5, 2),
(UUID(), 15, 3),
(UUID(), 7, 4),
(UUID(), 20, 5);

-- User
INSERT INTO User (User_ID, User_Name, First_name, Last_name, Email, DOB, Age, Gender, Username, Password, Role)
VALUES 
(UUID(), 'jdoe', 'John', 'Doe', 'john.doe@example.com', '1990-01-15', 34, 'Male', 'johndoe', 'pass1234', 'registered user'),
(UUID(), 'jsmith', 'Jane', 'Smith', 'jane.smith@example.com', '1985-07-30', 39, 'Female', 'janesmith', 'pass2345', 'registered user'),
(UUID(), 'mjones', 'Michael', 'Jones', 'michael.jones@example.com', '1975-09-12', 49, 'Male', 'mikej', 'pass3456', 'Admin'),
(UUID(), 'edavis', 'Emily', 'Davis', 'emily.davis@example.com', '1992-05-24', 32, 'Female', 'emdavis', 'pass4567', 'registered user'),
(UUID(), 'rbrown', 'Robert', 'Brown', 'robert.brown@example.com', '1980-11-11', 44, 'Male', 'rbrown', 'pass5678', 'registered user');

-- Booking
INSERT INTO Booking (Booking_ID, Shedule_ID, Passenger_ID, User_ID, Seat_ID, Final_Price, Booking_Status)
VALUES 
(UUID(), UUID(), 1, UUID(), UUID(), 450.00, 'confirmed'),
(UUID(), UUID(), 2, UUID(), UUID(), 400.00, 'pending'),
(UUID(), UUID(), 3, UUID(), UUID(), 500.00, 'cancelled'),
(UUID(), UUID(), 4, UUID(), UUID(), 600.00, 'confirmed'),
(UUID(), UUID(), 5, UUID(), UUID(), 550.00, 'pending');
