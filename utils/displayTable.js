const inquirer = require('inquirer');
const db = require('../congif/connection');
const init = require('../index');

function displayDepartments() {
    db.query('SELECT * FROM departments', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log("\n");
        init();
    });
}

function displayRoles() {
    db.query('SELECT roles.id, roles.job_title, departments.department_name, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log("\n");
        init();
    });
}

function displayEmployees() {
    db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department_name, roles.salary, employees.reporting_manager_id FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id", function (err, result) {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log("\n");
        init();
    });
}

function displayBudget () {
    let departmentArray = [];

    db.query(`SELECT department_name FROM departments`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            departmentArray.push(result[i].department_name);
        }

        inquirer
            .prompt(questions)
            .then((answer) => {

                db.query(`SELECT * FROM departments`, function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    for (let i = 0; i < result.length; i++) {
                        if (answer.department === result[i].department_name) {
                            departmentId = result[i].id;
                        }
                    }

                    db.query(`SELECT department_id, SUM(salary) AS utilized_budget FROM roles WHERE department_id = ? GROUP BY department_id;`, departmentId, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.table(result);
                        init();
                    })
                });
            });
    });

    const questions = [
        {
            type: 'list',
            message: "What is the name of the department you would like to see the utilised budget for?",
            name: 'department',
            choices: departmentArray
        }
    ];

}

module.exports = { displayDepartments, displayRoles, displayEmployees, displayBudget }