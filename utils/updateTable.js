const inquirer = require('inquirer');
const db = require('../congif/connection');
const { displayEmployees } = require('./displayTable');

function updateEmployee() {
    let employeeArray = [];
    let roleArray = [];

    db.query(`SELECT * FROM employees`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            employeeArray.push(result[i].first_name + " " + result[i].last_name);
        }

        db.query(`SELECT job_title FROM roles`, function (err, result) {
            if (err) {
                console.log(err);
            }

            for (let i = 0; i < result.length; i++) {
                roleArray.push(result[i].job_title);
            }

            inquirer
                .prompt(questions)
                .then((answer) => {
                    let employeeId;
                    let roleId;

                    db.query(`SELECT * FROM employees`, function (err, result) {
                        if (err) {
                            console.log(err);
                        }

                        for (let i = 0; i < result.length; i++) {
                            if (answer.employee === result[i].first_name + " " + result[i].last_name) {
                                employeeId = result[i].id
                            }
                        }
                    });

                    db.query(`SELECT * FROM roles`, function (err, result) {
                        if (err) {
                            console.log(err);
                        }

                        for (let i = 0; i < result.length; i++) {
                            if (answer.role === result[i].job_title) {
                                roleId = result[i].id;
                            }
                        }
                        console.log(roleId);

                        const sql = "UPDATE employees SET role_id = ? WHERE id = ?";
                        const values = [roleId, employeeId];

                        db.query(sql, values, function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(`Added ${answer.role} to the database`);
                            displayEmployees();
                        });
                    });
                });
        });

    });

    const questions = [
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'employee',
            choices: employeeArray
        },
        {
            type: 'list',
            message: "What role do you want to assign to the selected employee?",
            name: 'role',
            choices: roleArray
        }
    ];
}

module.exports = updateEmployee;