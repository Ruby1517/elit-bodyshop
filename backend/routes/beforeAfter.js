const express = require('express');
const router = express.Router();
const BeforeAfter = require('../models/BeforeAfter');

router.post('/', async (req, res) => {
  try {
    const { beforeImage, afterImage, description } = req.body;

    // Validate input
    if (!beforeImage || !afterImage) {
      return res.status(400).json({ message: 'Before and after image URLs are required' });
    }

    // Save to MongoDB
    const beforeAfter = new BeforeAfter({
      beforeImage,
      afterImage,
      description
    });
    await beforeAfter.save();

    res.status(201).json({ message: 'Images saved successfully', beforeAfter });
  } catch (error) {
    console.error('Error saving images:', error);
    res.status(500).json({ message: 'Failed to save images' });
  }
});

router.get('/', async (req, res) => {
  try {
    const beforeAfters = await BeforeAfter.find();
    res.json(beforeAfters);
  } catch (error) {
    console.error('Error fetching before/after images:', error);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
});

module.exports = router;