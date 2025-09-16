// filepath: c:\Users\michael.honie\source\repos\EPR\Employee-Performance-Rating-main\employee-performance-rating-node\src\routes\employee.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const sql = require('mssql'); // Import the mssql library

router.get('/:id', async (req, res) => {
  console.log('Request received for employee:', req.params.id);
  try {
    const result = await pool.request()
      .input('id', sql.VarChar, req.params.id)
      .query('SELECT * FROM hrpersnl WHERE p_empno = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;