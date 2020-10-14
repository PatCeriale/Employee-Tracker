const mysql = require("mysql");
const inquirer = require("inquirer");
const viewEmployees = viewEmp();

function viewAll() {
  inquirer
    .prompt({
      name: "viewPrompt",
      type: "list",
      message: "Which would you like to view?",
      choices: ["DEPARTMENTS", "ROLES", "EMPLOYEES", "EXIT"],
    })
    .then(function (answer) {
      if (answer.viewPrompt === "DEPARTMENTS") {
        //Select employees by department
        viewDepartments();
      } else if (answer.viewPrompt === "ROLES") {
        // Select employees by role
        viewRoles();
      } else if (answer.viewPrompt === "EMPLOYEES") {
        // View all employees
        viewEmployees();
      } else {
        connection.end();
        start();
      }
    });
  console.log("Here is your current staff!");
}

function viewDepartments() {
  console.log("Here are the departments");
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "deptChoice",
        type: "rawlist",
        message: "Which department would you like to view?",
        choices: function () {
          let choiceArray = [];
          for (let i = 0; i < res.length; i++) {
            choiceArray.push(res[i].department);
          }
          return choiceArray;
        },
      })
      .then(function (answer) {
        let chosenDept;
        for (var i = 0; i < res.length; i++) {
          if (res[i].department === answer.deptChoice) {
            chosenDept = res[i];
            connection.query("SELECT * FROM departments", function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            });
          }
        }
      });
  });
}

function viewRoles() {
  // Copy viewDept but change to roles
  console.log("Here are the roles");
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "roleChoice",
        type: "rawlist",
        message: "Which role would you like to view?",
        choices: function () {
          let choiceArray = [];
          for (let i = 0; i < res.length; i++) {
            choiceArray.push(res[i].role);
          }
          return choiceArray;
        },
      })
      .then(function (answer) {
        let chosenRole;
        for (var i = 0; i < res.length; i++) {
          if (res[i].role === answer.roleChoice) {
            chosenRole = res[i];
            connection.query("SELECT * FROM roles", function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            });
          }
        }
      });
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.log("Here are the employees");
    console.table(res);
    start();
  });
}

module.exports = viewEmployees;
