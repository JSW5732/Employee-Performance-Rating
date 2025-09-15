const express = require('express');
const router = express.Router();
const pool = require('../../db');

router.get('/:id', async (req, res) => {
  console.log('Request received for employee:', req.params.id); // <-- Add this line
  try {
    const [rows] = await pool.query(
      'SELECT * FROM employees WHERE p_empno = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Database error:', err); // <-- more detailed error
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;