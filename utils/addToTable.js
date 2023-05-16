const inquirer = require('inquirer');
const db = require('../congif/connection');
const { displayDepartments, displayRoles, displayEmployees } = require('./displayTable');

function addDepartment() {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?'
            })
        .then((answer) => {
            db.query(`INSERT INTO departments (department_name) VALUES (?)`, answer.department, function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log(`Added ${answer.department} to the database`);
                displayDepartments();
            })
        });
}

function addRole() {
    let departmentArray = [];

    db.query(`SELECT department_name FROM departments`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            departmentArray.push(result[i].department_name);
        }
    });

    const questions = [
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            message: 'What department does the role beong to?',
            name: 'department',
            choices: departmentArray
        }
    ];


    inquirer
        .prompt(questions)
        .then((answer) => {
            let departmentId;

            db.query(`SELECT * FROM departments`, function (err, result) {
                if (err) {
                    console.log(err);
                }

                for (let i = 0; i < result.length; i++) {
                    if (answer.department === result[i].department_name) {
                        departmentId = result[i].id;
                    }
                }

                const sql = "INSERT INTO roles (job_title, department_id, salary) VALUES (?, ?, ?)";
                const values = [answer.role, departmentId, Number(answer.salary)];

                db.query(sql, values, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${answer.role} to the database`);
                    displayRoles();
                })
            });
        });
}


function addEmployee() {
    let roleArray = [];
    let managerArray = [];

    db.query(`SELECT job_title FROM roles`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            roleArray.push(result[i].job_title);
        }
    });

    db.query(`SELECT reporting_manager FROM employees`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            managerArray.push(result[i].reporting_manager);
        }
    });

    const questions = [
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'roles',
            choices: roleArray
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'manager',
            choices: managerArray
        }
    ];

    inquirer
        .prompt(questions)
        .then((answer) => {
            let roleId;

            db.query(`SELECT * FROM roles`, function (err, result) {
                if (err) {
                    console.log(err);
                }

                for (let i = 0; i < result.length; i++) {
                    if (answer.roles === result[i].job_title) {
                        roleId = result[i].id;
                    }
                }
                const sql = "INSERT INTO employees (first_name, last_name, reporting_manager, role_id) VALUES (?, ?, ?, ?)";
                const values = [answer.firstName, answer.lastName, answer.manager, roleId];

                db.query(sql, values, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${answer.firstName} ${answer.lastName}to the database`);
                    displayEmployees();
                });
            });
        });
}



module.exports = { addDepartment, addRole, addEmployee };