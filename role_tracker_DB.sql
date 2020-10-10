DROP DATABASE IF EXISTS role_tracker_DB;
CREATE DATABASE role_tracker_DB;

USE role_tracker_DB;

CREATE TABLE roles(
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(100) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (role_id)
);
