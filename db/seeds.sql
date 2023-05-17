INSERT INTO departments (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finace"),
        ("Legal");

INSERT INTO roles (job_title, department_id, salary)
VALUES  ("Sales Lead", 1, 100000),
        ("Salesperson", 1, 80000),
        ("Lead Engineer", 2, 150000),
        ("Software Engineer", 2, 120000),
        ("Account Manager", 3, 160000),
        ("Accounant", 3, 125000),
        ("Leagl Team Lead", 4, 250000),
        ("Lawyer", 4, 190000);

INSERT INTO employees (first_name, last_name, reporting_manager_id, role_id)
VALUES  ("John", "Doe", NULL, 1),
        ("Mike", "Chan", 1, 2),
        ("Ashley", "Rodrigez", NULL, 3),
        ("Kevin", "Tupik",3, 4),
        ("Kunal", "Singh", NULL, 5),
        ("Maria", "Brown", 5, 6),
        ("Sarah", "Lourd", NULL, 7),
        ("Tom", "Allen", 7, 8);