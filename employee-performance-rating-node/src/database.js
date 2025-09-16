const sql = require('mssql');

require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: false
    }
};

const pool = new sql.ConnectionPool(config);

// Connect to the database and handle errors
pool.connect().catch(err => {
    console.error('Database connection failed:', err.message);
});

module.exports = pool;