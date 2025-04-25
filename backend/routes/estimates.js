// routes/estimate.js
const express = require('express');
const router = express.Router();
const Estimate = require('../models/Estimate');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, vehicle, damage, imageUrls } = req.body;

    const newEstimate = new Estimate({
      name,
      email,
      phone,
      vehicle,
      damage,
      imageUrls
    });

    await newEstimate.save();
    res.status(201).json({ message: 'Estimate saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving estimate' });
  }
});

module.exports = router;
