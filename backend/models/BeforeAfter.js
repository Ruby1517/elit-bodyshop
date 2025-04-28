const mongoose = require('mongoose');

const BeforeAfterSchema = new mongoose.Schema({
  title: { type: String }, // e.g., "2019 Honda Civic Front Bumper Repair"
  description: { type: String },
  beforeMedia: [{ type: String }],  // store image URLs or file paths
  afterMedia: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BeforeAfter', BeforeAfterSchema);