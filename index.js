const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Chivalry123!',
        database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
);

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initialise',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit']
    }
]

function init() {
    inquirer
        .prompt(questions)
        .then((answer) => {
            switch (answer.initialise){
                case "View All Departments":

                    displayDepartments();

                    break;
                case "View All Roles":
                    
                    displayRoles();

                    break;
                case "View All Employees":
                    
                    displayEmployees();

                    break;
                case "Add Department":
                    
                    addDepartment();

                    break;
                case "Add Role":

                    let departmentArray = [];
                    let departmetnResults;
  
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
                            
                                const sql = "INSERT INTO roles (job_title, department_id, salary) VALUES ?";
                                const values = [answer.role, departmentId, Number(answer.salary)];
                                db.query(sql, [values], function(err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log(`Added ${answer.role} to the database`);
                                    displayRoles();
                                })
                            });
                        });
                    break;
                case "Add Employee":
                    console.log("hello")
                    break;
                case "Update Employee Role":
                    console.log("hello")
                    break;
                case "Quit":
                    process.exit();
            }
        });
}

init();

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
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department_name, roles.salary, employees.reporting_manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log("\n");
        init();
    });
}

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