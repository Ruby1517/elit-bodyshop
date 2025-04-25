const express = require('express');
const router = express.Router();
const BeforeAfter = require('../models/BeforeAfter.js');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload.js');

// Upload before and after photos
router.post('/upload', async(req, res) => {
  try {
    const { title, description, beforeImages, afterImages } = req.body;

    const newEntry = new BeforeAfter({
      title,
      description,
      beforeImages,
      afterImages
    });
    await newEntry.save();
    res.status(200).json({ message: 'Saved Successfully' })

  } catch (err) {
    res.status(500).json({ error: err.message });
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

