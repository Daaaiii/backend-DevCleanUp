create database DevCleanUP;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
);

create table clients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) ,
    telephone VARCHAR(20),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
)
ALTER TABLE clients
ADD COLUMN coord_x INT,
ADD COLUMN coord_y INT;
