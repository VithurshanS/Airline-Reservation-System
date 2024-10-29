DROP schema if exists AIRLINE;
CREATE schema AIRLINE;
use AIRLINE;


CREATE TABLE Location (
    Location_ID INT auto_increment PRIMARY KEY,
    Parent_Location_ID INT,
    Address VARCHAR(255),
    FOREIGN KEY (parent_Location_ID) REFERENCES Location(Location_ID)
);

INSERT INTO Location (Location_ID,Parent_Location_ID, Address) VALUES (1,NULL, 'sri lanka');
INSERT INTO Location (Location_ID,Parent_Location_ID, Address) VALUES (2,1, 'western');
INSERT INTO Location (Location_ID,Parent_Location_ID, Address) VALUES (3,2, 'colombo');
INSERT INTO Location (Location_ID,Parent_Location_ID, Address) VALUES (4,1, 'northern');
INSERT INTO Location (Location_ID,Parent_Location_ID, Address) VALUES (5,4, 'jaffna');


CREATE TABLE Aircraft (
    Aircraft_ID INT auto_increment PRIMARY KEY,
    Company VARCHAR(255),
    Aircraft_type VARCHAR(255),
    Total_seats INT,
    Economy_seat_start_no INT,
    Business_seat_start_no INT,
    Platinum_seat_start_no INT
);

INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Boeing', '737', 180, 1, 121, 171);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Airbus', 'A320', 190, 1, 131, 181);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Boeing', '747', 400, 1, 301, 351);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Airbus', 'A380', 500, 1, 351, 451);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Embraer', 'E190', 110, 1, 91, 101);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Bombardier', 'CRJ700', 80, 1, 61, 71);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Boeing', '777', 300, 1, 221, 271);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Airbus', 'A330', 250, 1, 201, 241);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Boeing', '787', 240, 1, 181, 221);
INSERT INTO Aircraft (Company, Aircraft_type, Total_seats, Economy_seat_start_no, Business_seat_start_no, Platinum_seat_start_no) VALUES ('Airbus', 'A350', 300, 1, 241, 281);


CREATE TABLE Airport (
    Airport_Code VARCHAR(5) PRIMARY KEY,
    Airport_name VARCHAR(255),
    Location_ID INT,
    FOREIGN KEY (Location_ID) REFERENCES Location(Location_ID)
);

INSERT INTO Airport (Airport_Code, Airport_name, Location_ID) VALUES ('CMB', 'Colombo International Airport', 3);
INSERT INTO Airport (Airport_Code, Airport_name, Location_ID) VALUES ('JAF', 'Jaffna Airport', 5);

CREATE TABLE Plane (
    Plane_ID INT auto_increment PRIMARY KEY,
    Aircraft_ID INT,
    Plane_name VARCHAR(20),
    FOREIGN KEY (Aircraft_ID) REFERENCES Aircraft(Aircraft_ID)
);

INSERT INTO Plane (Plane_ID,Aircraft_ID,Plane_name) values (1,2,"nightfury");
INSERT INTO Plane (Plane_ID,Aircraft_ID,Plane_name) values (2,4,"shadower");

CREATE TABLE Route (
    Route_ID INT auto_increment PRIMARY KEY,
    Departure_Airport VARCHAR(5),
    Arrival_Airport VARCHAR(5),
    FOREIGN KEY (Departure_Airport) REFERENCES Airport(Airport_Code),
    FOREIGN KEY (Arrival_Airport) REFERENCES Airport(Airport_Code)
);

INSERT INTO Route (Route_ID,Departure_Airport, Arrival_Airport) VALUES (1,'JAF', 'CMB');
INSERT INTO Route (Route_ID,Departure_Airport, Arrival_Airport) VALUES (2,'CMB', 'JAF');

CREATE TABLE Passenger (
    Passenger_ID CHAR(36) PRIMARY KEY,
    Passenger_Name VARCHAR(200),
    Passport_Number CHAR(10),
    DOB DATE,
    AGE INT,
    Gender ENUM('Male', 'Female')
);

INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'A123456789', '1990-01-01', 'Male');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('223e4567-e89b-12d3-a456-426614174001', 'Jane Smith', 'B987654321', '1985-05-15', 'Female');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('323e4567-e89b-12d3-a456-426614174002', 'Michael Brown', 'C112233445', '1992-10-20', 'Male');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('423e4567-e89b-12d3-a456-426614174003', 'Emily Davis', 'D556677889', '1988-07-30', 'Female');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('523e4567-e89b-12d3-a456-426614174004', 'Robert Wilson', 'E223344556', '1975-03-25', 'Male');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('623e4567-e89b-12d3-a456-426614174005', 'Sarah Johnson', 'F667788990', '1999-11-11', 'Female');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('723e4567-e89b-12d3-a456-426614174006', 'James Williams', 'G445566778', '1981-02-05', 'Male');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('823e4567-e89b-12d3-a456-426614174007', 'Patricia Martinez', 'H998877665', '1995-08-12', 'Female');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('923e4567-e89b-12d3-a456-426614174008', 'Thomas White', 'I123498765', '1987-12-22', 'Male');
INSERT INTO Passenger (Passenger_ID, Passenger_Name, Passport_Number, DOB, Gender) VALUES ('a23e4567-e89b-12d3-a456-426614174009', 'Lisa Garcia', 'J777665544', '1993-06-06', 'Female');


CREATE TABLE User (
    User_ID CHAR(36) PRIMARY KEY,
    User_Name VARCHAR(200) UNIQUE,
    First_name VARCHAR(200),
    Last_name VARCHAR(200),
    Email VARCHAR(200),
    DOB DATE,
    Age INT,
    Gender ENUM('Male', 'Female'),
    Password VARCHAR(255),
    Role ENUM('Admin', 'R_user')
);

CREATE TABLE Category (
    Category_ID INT PRIMARY KEY,
    Category_Type VARCHAR(255),
    Discount DECIMAL(2,2),
    RBC INT
    
);

INSERT INTO User (User_ID, User_Name, First_name, Last_name, Email, DOB, Age, Gender, Password, Role) 
VALUES ('b13e4567-e89b-12d3-a456-426614174010', 'vithus', 'vithurshan', 'sivanathan', 'vithu@example.com', '2002-09-22', 22, 'Male', 'password123', 'R_user');
INSERT INTO User (User_ID, User_Name, First_name, Last_name, Email, DOB, Age, Gender, Password, Role) 
VALUES ('c13e4567-e89b-12d3-a456-426614174011', 'jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', '1985-05-15', 39, 'Female', 'password456', 'Admin');

INSERT INTO User (User_ID, User_Name, First_name, Last_name, Email, DOB, Age, Gender, Password, Role) 
VALUES ('d13e4567-e89b-12d3-a456-426614174012', 'michael_brown', 'Michael', 'Brown', 'michael.brown@example.com', '1992-10-20', 31, 'Male', 'password789', 'R_user');


INSERT INTO Category (Category_ID, Category_Type, Discount,RBC) VALUES (1, 'normal', 0.00,0);
INSERT INTO Category (Category_ID, Category_Type, Discount,RBC) VALUES (2, 'frequent', 0.05,5);
INSERT INTO Category (Category_ID, Category_Type, Discount,RBC) VALUES (3, 'gold', 0.10,10);
INSERT INTO Category (Category_ID, Category_Type, Discount,RBC) VALUES (4, 'platinum', 0.15,15);

CREATE TABLE User_Category (
    User_ID CHAR(36),
    Bookings_count INT,
    Category_ID INT,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID)
);

INSERT INTO User_Category (User_ID, Bookings_count, Category_ID) 
VALUES ('b13e4567-e89b-12d3-a456-426614174010', 0, 1);
INSERT INTO User_Category (User_ID, Bookings_count, Category_ID) 
VALUES ('c13e4567-e89b-12d3-a456-426614174011', 10, 3);
INSERT INTO User_Category (User_ID, Bookings_count, Category_ID) 
VALUES ('d13e4567-e89b-12d3-a456-426614174012', 3, 2);



CREATE TABLE Schedule (
    Schedule_ID CHAR(36) PRIMARY KEY,
    Route_ID INT,
    Plane_ID INT,
    Departure_Time DATETIME,
    Arrival_Time DATETIME,
    Economy_Fare DECIMAL(10,2),
    Business_Fare DECIMAL(10,2),
    Platinum_Fare DECIMAL(10,2),
    FOREIGN KEY (Route_ID) REFERENCES Route(Route_ID),
    FOREIGN KEY (Plane_ID) REFERENCES Plane(Plane_ID)
);

INSERT INTO Schedule (Schedule_ID, Route_ID, Plane_ID, Departure_Time, Arrival_Time, Economy_Fare, Business_Fare, Platinum_Fare) VALUES ('613e4567-e89b-12d3-a456-426614174020', 2, 1, '2024-11-01 08:00:00', '2024-11-01 10:00:00', 10000.00, 20000.00, 30000.00);
INSERT INTO Schedule (Schedule_ID, Route_ID, Plane_ID, Departure_Time, Arrival_Time, Economy_Fare, Business_Fare, Platinum_Fare) VALUES ('713e4567-e89b-12d3-a456-426614174021', 1, 2, '2024-11-01 14:00:00', '2024-11-01 16:00:00', 12000.00, 22000.00, 32000.00);


CREATE TABLE Seat (
    Seat_ID CHAR(36) PRIMARY KEY,
    Schedule_ID CHAR(36),
    Seat_number INT,
    Seat_class ENUM('economy', 'business', 'platinum'),
    Seat_status ENUM('available', 'selected', 'booked'),
    FOREIGN KEY (Schedule_ID) REFERENCES Schedule(Schedule_ID)
);

INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
VALUES ('a13e4567-e89b-12d3-a456-426614174030', '613e4567-e89b-12d3-a456-426614174020', 1, 'economy', 'available');

INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
VALUES ('b13e4567-e89b-12d3-a456-426614174031', '613e4567-e89b-12d3-a456-426614174020', 121, 'business', 'available');

INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
VALUES ('c13e4567-e89b-12d3-a456-426614174032', '613e4567-e89b-12d3-a456-426614174020', 171, 'platinum', 'available');
INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
VALUES ('d13e4567-e89b-12d3-a456-426614174033', '713e4567-e89b-12d3-a456-426614174021', 1, 'economy', 'available');

INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
VALUES ('e13e4567-e89b-12d3-a456-426614174034', '713e4567-e89b-12d3-a456-426614174021', 131, 'business', 'available');

INSERT INTO Seat (Seat_ID, Schedule_ID, Seat_number, Seat_class, Seat_status)
VALUES ('f13e4567-e89b-12d3-a456-426614174035', '713e4567-e89b-12d3-a456-426614174021', 181, 'platinum', 'available');


CREATE TABLE Booking (
    Booking_ID CHAR(36) PRIMARY KEY,
    Passenger_ID CHAR(36),
    User_ID CHAR(36),
    Final_Price DECIMAL(10,2),
    Booking_Status ENUM('pending', 'confirmed', 'cancelled'),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Booking_ID) REFERENCES Seat(Seat_ID)
);



