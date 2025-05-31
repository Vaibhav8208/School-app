// testDb.js
const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB connection error:', err.stack);
  } else {
    console.log('DB connected. Server time:', res.rows[0]);
  }
  pool.end();
});
