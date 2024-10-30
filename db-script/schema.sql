DROP schema if exists AIRLINE;
CREATE database AIRLINE;
use AIRLINE;


CREATE TABLE Location (
    Location_ID INT auto_increment PRIMARY KEY,
    Parent_Location_ID INT,
    Address VARCHAR(255),
    FOREIGN KEY (parent_Location_ID) REFERENCES Location(Location_ID)
);



CREATE TABLE Aircraft (
    Aircraft_ID INT auto_increment PRIMARY KEY,
    Company VARCHAR(255),
    Aircraft_type VARCHAR(255),
    Total_seats INT,
    Economy_seat_start_no INT,
    Business_seat_start_no INT,
    Platinum_seat_start_no INT
);




CREATE TABLE Airport (
    Airport_Code VARCHAR(5) PRIMARY KEY,
    Airport_name VARCHAR(255),
    Location_ID INT,
    FOREIGN KEY (Location_ID) REFERENCES Location(Location_ID)
);



CREATE TABLE Plane (
    Plane_ID INT auto_increment PRIMARY KEY,
    Aircraft_ID INT,
    Plane_name VARCHAR(20),
    FOREIGN KEY (Aircraft_ID) REFERENCES Aircraft(Aircraft_ID)
);



CREATE TABLE Route (
    Route_ID INT auto_increment PRIMARY KEY,
    Departure_Airport VARCHAR(5),
    Arrival_Airport VARCHAR(5),
    FOREIGN KEY (Departure_Airport) REFERENCES Airport(Airport_Code),
    FOREIGN KEY (Arrival_Airport) REFERENCES Airport(Airport_Code)
);


CREATE TABLE Passenger (
    Passenger_ID CHAR(36) PRIMARY KEY,
    Passenger_Name VARCHAR(200),
    Passport_Number CHAR(10) UNIQUE,
    DOB DATE,
    AGE INT,
    Gender ENUM('Male', 'Female')
);


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



CREATE TABLE Seat (
    Seat_ID CHAR(36) PRIMARY KEY,
    Schedule_ID CHAR(36),
    Seat_number INT,
    Seat_class ENUM('economy', 'business', 'platinum'),
    Seat_status ENUM('available', 'selected', 'booked'),
    FOREIGN KEY (Schedule_ID) REFERENCES Schedule(Schedule_ID)
);


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



