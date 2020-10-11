DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE employees(
  empl_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT,
  manager_id VARCHAR(100),
  PRIMARY KEY (empl_id)
);

CREATE TABLE roles(
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(100) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (role_id)
);

CREATE TABLE departments(
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Patrick", "Ceriale", 1);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Poppy", "Ceriale", 2);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Jonathon", "Pothos", 3);