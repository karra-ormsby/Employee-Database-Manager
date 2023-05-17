# Employee-Database-Manager

## Description

I have written a command-line application to manage a company's employee database. With it you are able to view a company's departments, roles, and employees. The application allows the user add to each of these three fields as well as update them. The user is also able to view how much a selected department is using towards their budget for the employees salaries.

## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)

## Installation

This application uses node.js to run. Please make sure you have it installed before trying to run the application. You can find a link to node.js [here](https://nodejs.org/en).

This application uses npm packages Inquirer, to allow the application to ask the user questions, mysql2 for running the database queries, and dotenv to be able to use a .env file to keep mysql login data safe. All of these packages have already been loaded into the dependencies of the package.json file.

As this application is using dotenv to use a .env file for mysql login data, you will needs to create your own file and populate it with your own information. It should have the format:

![.env file example](./assets/images/env%20file%20example.png)

The application comes with source.sql and seeds.sql files to create and populate the database. You will need to have mysql running on your computer and run the following commands in the terminal:
1. "mysql -u root" to open mysql (if you have a password on your mysql you will need to run the command "mysql -u root -p" instead and then input your password when prompted).
2. "source db/schema.sql;" to create the database and tables associated with it.
3. "source db/seeds.sql;" to populate the tables with data (if may skip this step if you wish to populate the tables yourself).

To run the application:
1. Right click the index.js file and click 'open in integrated terminal' or if you code editor does not have this function then you can use your terminal and make sure you are giving it the right file path.
2. Type "npm install" into the terminal to load in the npm packages.
3. Type "node index.js" to start the application.

## Usage

Once you have opened up the terminal to the path corresponding to the application (see installation section for how to do this), type "node index.js" and press enter to run the application. 

You will then get a list of options to choose from. 

![main menu](./assets/images/main%20menu.png)

'View All Departments', 'View All Roles', and 'View All Employees' require no further input from the user. 

Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Delete Department', 'Delete Role', 'Delete Employee', and 'View Utilised Budget By Department' will require more information from the user, which they will be prompted for.

Please note that some additional inputs from the user require a specific datatype eg. An employees name must be alpha characters, an employees salary must be numerical. If you enter the incorrect datatype the application will quit and you will be met with an error code as to what went wrong.

To quit the application, from the main menu select 'Quit' or from anywhere else push ctrl + c to exit.

A video of the usage of this application can be found [here](https://drive.google.com/file/d/1BZ8C6k9G8nf_mapo7xOr5Fw4C0uGXU4T/view).

## Credits

Reached out to AskBCS for help with the write syntax for queries when adding multiple variables to a query with '?', and how to make budget query show department names instead of department ids.
