DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR (30) NOT NULL,
last_name VARCHAR (30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES 
('Billy','Crystal',1, NULL),
('Eddie','Murphy',2, 1),
('Richard','Pryor',3, NULL),
('George','Carlin',4, 3),
('Joan','Rivers',5, NULL),
('Robin','Williams',6, 5),
('Bill','Burr',7, NULL),
('Louie','CK',8, 7);

SELECT * FROM employee;  

CREATE TABLE employee_role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT,
PRIMARY KEY (id)
);
INSERT INTO employee_role (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO employee_role (title, salary, department_id) values ('Sales Person', 80000, 1);
INSERT INTO employee_role (title, salary, department_id) values ('Lead Engineer', 200000, 2);
INSERT INTO employee_role (title, salary, department_id) values ('Software Engineer', 150000, 2);
INSERT INTO employee_role (title, salary, department_id) values ('Accounting Lead', 170000, 3);
INSERT INTO employee_role (title, salary, department_id) values ('Accountant', 125000, 3);
INSERT INTO employee_role (title, salary, department_id) values ('Legal Team Lead', 150000, 4);
INSERT INTO employee_role (title, salary, department_id) values ('Lawyer', 125000, 4);
