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

module.exports = db;