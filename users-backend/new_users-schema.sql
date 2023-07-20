CREATE TABLE users (
    user_id SERIAL, 
    username VARCHAR(25),
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT NOT NULL CHECK(position('@' IN email) > 1)
)