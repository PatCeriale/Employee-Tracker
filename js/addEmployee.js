const mysql = require("mysql");
const inquirer = require("inquirer");

// Function to add new employee
function addEmployee() {
  inquirer
    .prompt([
      // Questions for employees table
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee?",
      },
      {
        name: "manager",
        type: "input",
        message: "Who is the employee's manager?",
      },
      // Questions for roles table
      {
        name: "roleTitle",
        type: "input",
        message: "What is the employee's role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the employee's salary?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log(" is not a number. Please enter a number.");
          return false;
        },
      },
      // Question for department
      {
        name: "department",
        type: "input",
        message: "What department does the employee work for?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO employees SET ?", {
        first_name: answer.firstName,
        last_name: answer.lastName,
        manager_id: answer.manager,
        // role_id: comes from roles
        // manager_id: comes from
      });
      connection.query("INSERT INTO roles SET ?", {
        role_title: answer.roleTitle,
        salary: answer.salary,
      });
      connection.query("INSERT INTO departments SET ?", {
        dept_name: answer.department,
      }),
        function (err) {
          if (err) throw err;
        };
      // re-prompt the user for if they want to add/view/update employee
      console.log("Employee has been added!");
      start();
    });
}

module.exports = addEmployee;
