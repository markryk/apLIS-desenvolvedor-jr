const mysql = require('mysql2');

// Pool de conexões (melhor prática)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aplis'
});

module.exports = pool.promise(); //usar com async/await