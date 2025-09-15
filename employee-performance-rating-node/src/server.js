const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employee'); // Your employee routes file
const pool = require('./index'); // Import the connection pool from your index.js file

async function startServer() {
  try {
    // Await the connection of the pool before starting the server
    await pool.connect(); 
    console.log('Database pool connected successfully!');

    app.use('/employees', employeeRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  }
}

startServer();