INSERT INTO departments (department_name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finace"),
        ("Legal");

INSERT INTO roles (job_title, department_id, salary)
VALUES  ("Sales Lead", 1, 100000),
        ("Salesperson", 1, 80000),
        ("Lead Engineer", 2, 15000),
        ("Software Engineer", 2, 120000),
        ("Account Manager", 3, 160000),
        ("Accounant", 3, 125000),
        ("Leagl Team Lead", 4, 250000),
        ("Lawyer", 4, 190000);

INSERT INTO employees (first_name, last_name, reporting_manager, role_id)
VALUES  ("John", "Doe", "null", 1),
        ("Mike", "Chan", "John Doe", 2),
        ("Ashley", "Rodrigez", "null", 3),
        ("Kevin", "Tupik","Ashley Rodrigez", 4),
        ("Kunal", "Singh", "null", 5),
        ("Maria", "Brown", "Kunal Singh", 6),
        ("Sarah", "Lourd", "null", 7),
        ("Tom", "Allen", "Sarah Lourd", 8);