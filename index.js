const inquirer = require('inquirer');
const db = require('./congif/connection');

init();


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
    db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.job_title, departments.department_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.reporting_manager_id", function (err, result) {
        if (err) {
            console.log(err);
        }
        console.table(result);
        console.log("\n");
        init();
    });
}

function displayBudget() {
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

                    db.query(`SELECT department_name, SUM(salary) AS utilized_budget FROM departments JOIN roles ON roles.department_id = departments.id WHERE department_id = ? GROUP BY department_name`, departmentId, function (err, result) {
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
    let employeeArray = [];

    db.query(`SELECT job_title FROM roles`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            roleArray.push(result[i].job_title);
        }
    });

    db.query(`SELECT * FROM employees`, function (err, result) {
        if (err) {
            console.log(err);
        }

        for (let i = 0; i < result.length; i++) {
            employeeArray.push(result[i].first_name + " " + result[i].last_name);
        }
        employeeArray.push("null");
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
            choices: employeeArray
        }
    ];

    inquirer
        .prompt(questions)
        .then((answer) => {
            let managerId;
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
                db.query(`SELECT * FROM employees`, function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    for (let i = 0; i < result.length; i++) {
                        if (answer.manager === result[i].first_name + " " + result[i].last_name) {
                            managerId = result[i].id
                        }
                    }

                    const sql = "INSERT INTO employees (first_name, last_name, reporting_manager_id, role_id) VALUES (?, ?, ?, ?)";
                    const values = [answer.firstName, answer.lastName, managerId, roleId];

                    db.query(sql, values, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
                        displayEmployees();
                    });
                });
            });
        });
}


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