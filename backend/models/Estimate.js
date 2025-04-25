const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  phone: {
    type: String,
    default: ''
  },
  vehicle: {
    type: String,
    required: true,
    minlength: 1
  },
  damage: {
    type: String,
    required: true,
    minlength: 1
  },
  imageUrls: {
    type: [String], 
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'completed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Estimate', estimateSchema);