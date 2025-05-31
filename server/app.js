require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes');
const pool = require('./config/db'); // PostgreSQL connection
const employeeRoutes = require('./routes/employeeRoutes');


const app = express();

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Secure Signin route with password hashing
app.post('/api/signin', async (req, res) => {
  const { username, password, mobileNumber, age } = req.body;

  if (!username || !password || !mobileNumber || !age) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO users (username, password, mobile_number, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [username, hashedPassword, mobileNumber, age]);

    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });

  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Other routes
app.use('/api', authRoutes);
app.use('/api', employeeRoutes);

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
