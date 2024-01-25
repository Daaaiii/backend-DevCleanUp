create database DevCleanUP;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150),
    createdAt DATE,
    updatedAt DATE,
);

create table clients(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(150),
    createdAt DATE,
    updatedAt DATE,
)