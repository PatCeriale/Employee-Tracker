const mysql = require("mysql");
const inquirer = require("inquirer");
const addEmployee = require("./addEmployee");

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
        // TODO: figure out how to make this work
        addEmployee;
        // start();
      } else if (answer.addViewUpdate === "VIEW") {
        viewEmployees();
      } else if (answer.addViewUpdate === "UPDATE") {
        updateEmployees();
      } else {
        connection.end();
      }
    });
}

// // Function to add new employee
// function addEmployee() {
//   inquirer
//     .prompt([
//       // Questions for employees table
//       {
//         name: "firstName",
//         type: "input",
//         message: "What is the first name of the employee?",
//       },
//       {
//         name: "lastName",
//         type: "input",
//         message: "What is the last name of the employee?",
//       },
//       {
//         name: "manager",
//         type: "input",
//         message: "Who is the employee's manager?",
//       },
//       // Questions for roles table
//       {
//         name: "roleTitle",
//         type: "input",
//         message: "What is the employee's role?",
//       },
//       {
//         name: "salary",
//         type: "input",
//         message: "What is the employee's salary?",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           console.log(" is not a number. Please enter a number.");
//           return false;
//         },
//       },
//       // Question for department
//       {
//         name: "department",
//         type: "input",
//         message: "What department does the employee work for?",
//       },
//     ])
//     .then(function (answer) {
//       connection.query("INSERT INTO employees SET ?", {
//         first_name: answer.firstName,
//         last_name: answer.lastName,
//         manager_id: answer.manager,
//         // role_id: comes from roles
//         // manager_id: comes from
//       });
//       connection.query("INSERT INTO roles SET ?", {
//         role_title: answer.roleTitle,
//         salary: answer.salary,
//       });
//       connection.query("INSERT INTO departments SET ?", {
//         dept_name: answer.department,
//       }),
//         function (err) {
//           if (err) throw err;
//         };
//       // re-prompt the user for if they want to add/view/update employee
//       console.log("Employee has been added!");
//       start();
//     });
// }

// Function to view current employees
function viewEmployees() {
  // TODO: console.table? employee_tracker_DB
  console.log("Here is your current staff!");
  start();
}

// Function to update employees
function updateEmployees() {
  console.log("Employee has been updated!");
  start();
}
