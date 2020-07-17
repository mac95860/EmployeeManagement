DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;


CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE employee_role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    department_id INT NOT NULL
);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Mike", "Cervantes", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("John", "Doe", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Rick", "Sanchez", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Jane", "Smith", 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Terry", "Ditka", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Mark", "Fangmann", 6, 3);
9


INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Data Entry");

INSERT INTO department (department_name)
VALUES ("Human Recources");


INSERT INTO employee_role (title, department_id)
VALUES("Senior Engineer", 1);

INSERT INTO employee_role (title, department_id)
VALUES("Junior Front End Developer", 1);

INSERT INTO employee_role (title, department_id)
VALUES("Data Supervisor", 2);

INSERT INTO employee_role (title, department_id)
VALUES("Data Entry Specialist", 2);

INSERT INTO employee_role (title, department_id)
VALUES("Human Recources Manager", 3);

INSERT INTO employee_role (title, department_id)
VALUES("Human Recource Representative", 3);




