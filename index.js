const mysql = require("mysql");
const inquirer = require("inquirer");
// const addEmployee = require("./js/addEmployee");
// const viewEmployees = require("./js/viewEmployees");
// const updateEmployee = require("./js/updateEmployee");

// Create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306 || process.env.PORT,
  // TODO: Do I need the process.env.PORT?
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
      name: "startPrompt",
      type: "list",
      message:
        "Would you like to [ADD], [VIEW], [UPDATE] employee information or [EXIT]?",
      choices: ["ADD", "VIEW", "UPDATE", "EXIT"],
    })
    .then(function (answer) {
      if (answer.startPrompt === "ADD") {
        // TODO: figure out how to make this work
        addEmployee();
        // addEmployee;
      } else if (answer.startPrompt === "VIEW") {
        viewAll();
      } else if (answer.startPrompt === "UPDATE") {
        updateEmployees();
      } else {
        connection.end();
      }
    });
}

/////////////////// Function to add new employee ///////////////////
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

/////////////////// Function to view current employees ///////////////////
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

/////////////////// Function to update employees///////////////////
function updateEmployees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "empChoice",
        message: "What employee would you like to update?",
        type: "rawlist",
        choices: function () {
          let choiceArray = [];
          for (let i = 0; i < res.length; i++) {
            choiceArray.push(res[i].employee);
          }
          return choiceArray;
        },
      })
      .then(function (answer) {
        let chosenEmp;
        for (var i = 0; i < res.length; i++) {
          if (res[i].department === answer.empChoice) {
            chosenEmp = res[i];
            connection.query("SELECT * FROM employees", function (err, res) {
              if (err) throw err;
              console.table(res);
              start();
            });
          }
        }
      });
    console.log("Employee has been updated!");
    start();
  });
}
