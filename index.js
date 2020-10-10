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
  console.log("Employee has been added!");
  start();
}
function viewEmployees() {
  console.log("Here is your current staff!");
  start();
}
function updateEmployees() {
  console.log("Employee has been updated!");
  start();
}
