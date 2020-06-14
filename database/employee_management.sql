DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management;

USE employee_management;

CREATE TABLE department (
id  INTEGER (11) AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER(11) AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL(20,4),
department_id INTEGER(11),
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER(11) AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR (30),
role_id INTEGER(11),
manager_id INTEGER(11),
PRIMARY KEY (id)
);

