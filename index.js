const mysql = require("mysql");
const inquirer = require("inquirer");

// Create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, // Add process.env.PORT?
  user: "root",
  password: "password",
  database: "employee_tracker_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  //   start();
  console.log("We have lift off");
});

// // Prompt user for what action they would like to take
// function start() {
//   inquirer
//     .prompt({
//       name: "addViewUpdate",
//       type: "list",
//       message:
//         "Would you like to [ADD], [VIEW], [UPDATE] employee information or [EXIT]?",
//       choices: ["ADD", "VIEW", "UPDATE", "EXIT"],
//     })
//     .then(function (answer) {
//       if (answer.addViewUpdate === "ADD") {
//         addEmployee();
//       } else if (answer.addViewUpdate === "VIEW") {
//         viewEmployee();
//       } else if (answer.addViewUpdate === "UPDATE") {
//         updateEmployee();
//       } else {
//         connection.end();
//       }
//     });
// }
