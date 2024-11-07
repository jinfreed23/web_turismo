const mysql = require('mysql');
const { database } = require('../keys');

const connection = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database 
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID', connection.threadId);
});

module.exports = connection;
