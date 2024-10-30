create view schedulewithaddress as
select s.*,d_airport.Airport_Code as dep_airport,a_airport.Airport_Code as arr_airport,d_location.Address as dep_city,a_location.Address as arr_city from schedule s
join route r on r.Route_ID = s.Route_ID
join airport d_airport on d_airport.Airport_Code = r.Departure_Airport
join location d_location on d_location.Location_ID = d_airport.Location_ID
join airport a_airport on a_airport.Airport_Code = r.Arrival_Airport
join location a_location on a_location.Location_ID = a_airport.Location_ID;