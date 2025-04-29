
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

    // Emit real-time notification
    const io = req.app.get('io');
    io.emit('newEstimate', newEstimate);
    res.status(201).json({ message: 'Estimate saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving estimate' });
  }
});



router.get('/pending', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch paginated data
    const [estimates, totalCount] = await Promise.all([
      Estimate.find({ status: 'pending' }).skip(skip).limit(limit),
      Estimate.countDocuments({ status: 'pending' }),
    ]);

    res.json({
      estimates,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pending estimates' });
  }
});
router.get('/completed', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch paginated data
    const [estimates, totalCount] = await Promise.all([
      Estimate.find({ status: 'completed' }).skip(skip).limit(limit),
      Estimate.countDocuments({ status: 'completed' }),
    ]);

    res.json({
      estimates,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pending estimates' });
  }
});




router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // new status: 'reviewed' or 'completed'
    const updatedEstimate = await Estimate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedEstimate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating estimate status' });
  }
});



module.exports = router;
