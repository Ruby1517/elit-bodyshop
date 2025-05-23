const express = require('express');
const router = express.Router();
const BeforeAfter = require('../models/BeforeAfter.js');
const verifyAdminToken = require('../middleware/verifyAdminToken.js')
const upload = require('../middleware/upload.js');

// Upload before and after photos
router.post('/upload', verifyAdminToken, async(req, res) => {
  try {
    const { title, description, beforeMedia, afterMedia } = req.body;

    const newEntry = new BeforeAfter({
      title,
      description,
      beforeMedia,
      afterMedia
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

