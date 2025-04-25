require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const estimateRoutes = require('./routes/estimates');
const beforeAfterRoutes = require('./routes/beforeAfter');

const app = express();

const uri = process.env.MONGODB_URI; 
const dbName = 'autoBodyShop';

// Serve React app from frontend/build
app.use(express.static('frontend/build'));
app.use(express.json());


// Connect to MongoDB
if(!uri) {
  console.error('Error: MONGO_URI is not defined in .env');
  process.exit(1);
}
mongoose.connect(uri, {
  dbName,
  ssl: true,
  serverSelectionTimeoutMS: 15000
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
//   res.sendFile(`${__dirname}\\frontend\\build\\index.html`);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});