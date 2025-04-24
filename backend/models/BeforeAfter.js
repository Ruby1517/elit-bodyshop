const mongoose = require('mongoose');

const beforeAfterSchema = new mongoose.Schema({
  beforeImage: {
    type: String,
    required: true
  },
  afterImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BeforeAfter', beforeAfterSchema);