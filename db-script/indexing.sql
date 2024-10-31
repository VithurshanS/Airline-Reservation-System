CREATE INDEX ischedulerouteid ON schedule(Route_ID);
CREATE INDEX iroute_id ON route(Route_ID);
CREATE INDEX ideparture_airport ON route(Departure_Airport);
CREATE INDEX idx_route_arrival_airport ON route(Arrival_Airport);
CREATE INDEX iairport_code ON airport(Airport_Code);
CREATE INDEX ia_location_id ON airport(Location_ID);
CREATE INDEX iocation_id ON location(Location_ID);
