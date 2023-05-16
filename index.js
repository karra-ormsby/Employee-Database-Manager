const inquirer = require('inquirer');
const { displayDepartments, displayRoles, displayEmployees, displayBudget } = require('./utils/displayTable');
const { addDepartment, addRole, addEmployee } = require('./utils/addToTable');
const updateEmployee = require('./utils/updateTable');

function init() {
    const questions = [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'initialise',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'View Utilised Budget By Department', 'Quit']
        }
    ];

    inquirer
        .prompt(questions)
        .then((answer) => {
            switch (answer.initialise) {
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

                    addRole();

                    break;
                case "Add Employee":

                    addEmployee();

                    break;
                case "Update Employee Role":

                    updateEmployee();

                    break;
                case "View Utilised Budget By Department":

                    displayBudget();

                    break;
                case "Quit":
                    process.exit();
            }
        });
}

init();

module.exports = init;