const mysql = require("mysql");
const inquirer = require("inquirer");
const updateEmployee = updateEmployees();

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

module.exports = updateEmployee;
