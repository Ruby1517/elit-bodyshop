const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const User = require('./models/User'); 
require('dotenv').config();

// Your MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

async function createAdmin() {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected.');

    const existingAdmin = await User.findOne({ email: '559azi@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('Rodwin2015$', 10);

    const admin = new User({
      email: '559azi@gmail.com',
      password: hashedPassword,
      role: 'admin', 
    });

    await admin.save();
    console.log('Admin user created successfully.');
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdmin();
