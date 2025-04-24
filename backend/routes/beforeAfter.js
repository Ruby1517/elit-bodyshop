const express = require('express');
const router = express.Router();
const BeforeAfter = require('../models/BeforeAfter');
const { storage } = require('../firebaseConfig');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// GET: Retrieve all before/after pairs
router.get('/', async (req, res) => {
  try {
    const pairs = await BeforeAfter.find();
    res.status(200).json(pairs);
  } catch (error) {
    console.error('Error fetching before/after pairs:', error);
    res.status(500).json({ message: 'Failed to fetch before/after pairs' });
  }
});

// POST: Upload before/after images to Firebase and save metadata
router.post('/', upload.fields([{ name: 'beforeImage', maxCount: 1 }, { name: 'afterImage', maxCount: 1 }]), async (req, res) => {
  const { description } = req.body;
  const beforeImage = req.files['beforeImage'] ? req.files['beforeImage'][0] : null;
  const afterImage = req.files['afterImage'] ? req.files['afterImage'][0] : null;

  if (!beforeImage || !afterImage || !description) {
    return res.status(400).json({ message: 'Before image, after image, and description are required' });
  }

  try {
    // Upload before image to Firebase
    const beforeRef = ref(storage, `before-after/before_${Date.now()}_${beforeImage.originalname}`);
    await uploadBytes(beforeRef, beforeImage.buffer);
    const beforeUrl = await getDownloadURL(beforeRef);

    // Upload after image to Firebase
    const afterRef = ref(storage, `before-after/after_${Date.now()}_${afterImage.originalname}`);
    await uploadBytes(afterRef, afterImage.buffer);
    const afterUrl = await getDownloadURL(afterRef);

    // Save metadata to MongoDB
    const pair = new BeforeAfter({
      beforeImage: beforeUrl,
      afterImage: afterUrl,
      description
    });

    const savedPair = await pair.save();
    res.status(201).json({ message: 'Before/After pair created successfully', id: savedPair._id });
  } catch (error) {
    console.error('Error creating before/after pair:', error);
    res.status(500).json({ message: 'Failed to create before/after pair' });
  }
});

module.exports = router;