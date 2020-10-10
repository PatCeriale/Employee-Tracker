DROP DATABASE IF EXISTS department_tracker_DB;
CREATE DATABASE department_tracker_DB;

USE department_tracker_DB;

CREATE TABLE departments(
  dept_id INT NOT NULL AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (dept_id)
);
