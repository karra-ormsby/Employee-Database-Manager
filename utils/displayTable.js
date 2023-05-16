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
    db.query('SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department_name, roles.salary, employees.reporting_manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log("\n");
        init();
    });
}

module.exports = { displayDepartments, displayRoles, displayEmployees }