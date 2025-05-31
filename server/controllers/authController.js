const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcrypt');

   const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Username =", username, "Password =", password);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    const user = await findUserByUsername(username);
    console.log(user);
    
    if (!user) return res.status(401).json({ message: 'Invalid Username' });

    // Plain text comparison (insecure!)
   const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }



    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000,
    });

    res.status(200).json( {useri : user ,  message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
