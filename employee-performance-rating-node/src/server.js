const express = require('express');
const app = express();
const sql = require('mssql');
const employeeRoutes = require('./routes/employee');
require('dotenv').config();

// Define your database configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: false // Use true if connecting from Azure
    }
};

// Create the connection pool here
const pool = new sql.ConnectionPool(config);

// Use an async function to start the server and connect to the database
async function startServer() {
  try {
    // Await the connection of the pool itself
    await pool.connect(); 
    console.log('Database connection successful!');

    // Add your routes after a successful connection
    app.use('/employees', employeeRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    // This will catch the error if the connection fails
    console.error('Failed to connect to the database:', err.message);
    process.exit(1); // Exit the application with an error code
  }
}

// Call the async function to start the process
startServer();