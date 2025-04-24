const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

// POST: Create a new estimate
router.post('/', async (req, res) => {
  const { name, email, phone, vehicle, damage } = req.body;

  try {
    const estimate = new Estimate({
      name,
      email,
      phone: phone || '',
      vehicle,
      damage
    });

    const savedEstimate = await estimate.save();
    res.status(201).json({ message: 'Estimate submitted successfully', id: savedEstimate._id });
  } catch (error) {
    console.error('Error saving estimate:', error);
    res.status(500).json({ message: 'Failed to submit estimate' });
  }
});

module.exports = router;