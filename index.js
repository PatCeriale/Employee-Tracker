const mysql = require("mysql");
const inquirer = require("inquirer");

// Create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, //TODO: ????? Add || process.env.PORT,
  user: "root",
  password: "password",
  database: "employee_tracker_DB",
});

// Connect to server and database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// Prompt user for what action they would like to take, or end the cycle
function start() {
  inquirer
    .prompt({
      name: "addViewUpdate",
      type: "list",
      message:
        "Would you like to [ADD], [VIEW], [UPDATE] employee information or [EXIT]?",
      choices: ["ADD", "VIEW", "UPDATE", "EXIT"],
    })
    .then(function (answer) {
      if (answer.addViewUpdate === "ADD") {
        addEmployee();
      } else if (answer.addViewUpdate === "VIEW") {
        viewEmployees();
      } else if (answer.addViewUpdate === "UPDATE") {
        updateEmployees();
      } else {
        connection.end();
      }
    });
}

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
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          manager_id: answer.manager,
          // role_id: comes from roles
          // manager_id: comes from
        },
        "INSERT INTO roles SET ?",
        {
          role_title: answer.roleTitle,
          salary: answer.salary,
        },
        "INSERT INTO departments SET ?",
        {
          dept_name: answer.department,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee has been added!");
          // re-prompt the user for if they want to add, view or update employee
          start();
        }
      );
    });
}
function viewEmployees() {
  console.log("Here is your current staff!");
  start();
}
function updateEmployees() {
  console.log("Employee has been updated!");
  start();
}
