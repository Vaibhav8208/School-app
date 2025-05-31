const pool = require('../config/db');

const findUserByUsername = async (username) => {
  const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
};

module.exports = { findUserByUsername };
