const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const estimateRoutes = require('./routes/estimates');
const beforeAfterRoutes = require('./routes/beforeAfter');

const app = express();

const uri = process.env.MONGODB_URI; 
const dbName = 'autoBodyShop';

// Serve React app from frontend/build
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri, {
  dbName
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/estimates', estimateRoutes);
app.use('/api/before-after', beforeAfterRoutes);

// Serve React app for all routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});