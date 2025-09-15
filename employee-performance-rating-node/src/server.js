const express = require('express');
require('dotenv').config();

const app = express();
const employeeRoutes = require('./routes/employee');

app.use('/api/employee', employeeRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});