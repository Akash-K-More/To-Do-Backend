const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password, cpassword } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    
    if (await User.findByEmail(email).length>0) {
      res.status(409).json({ message: 'User already registered'});
      return
    }
    
    const userId = await User.create(email, email, passwordHash);
    res.status(201).json({ message: 'User registered', userId });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
