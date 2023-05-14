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