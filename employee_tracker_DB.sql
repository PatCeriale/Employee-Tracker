DROP DATABASE IF EXISTS employee_tracker_DB;
CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE employees(
  empl_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (empl_id)
);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Patrick", "Ceriale", 1);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Poppy", "Ceriale", 2);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Jonathon", "Pothos", 3);