const app = require('./app'); // Assuming your express app is exported from a separate file
const sql = require('mssql');
const config = require('./db.js'); // Your database connection configuration file

// Wrap your server startup in an async function
async function startServer() {
  try {
    // Connect to the database
    await sql.connect(config);
    console.log('Database connection successful!');

    // Start the server only after the database is connected
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit with a failure code
  }
}

startServer();