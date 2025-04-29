const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const verifyAdminToken = require('../middleware/verifyAdminToken')

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_jwt_secret_key',
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get admin user data
router.get('/admin', verifyAdminToken, async (req, res) => {
  try {
    // Assuming you're storing user data in a database model called User
    // Use req.admin to get the admin's data if needed (i.e., the decoded JWT)
    
    const adminUser = await User.findById(req.admin.id); // Find admin by ID from JWT token payload

    if (!adminUser) {
      return res.status(404).json({ message: 'Admin user not found' });
    }

    // Respond with the admin user data
    res.json({
      id: adminUser._id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
