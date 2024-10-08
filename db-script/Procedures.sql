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


//`INSERT INTO User (User_ID,User_Name,First_name,Last_name,Email,DOB,Age,Gender,Password,Role)