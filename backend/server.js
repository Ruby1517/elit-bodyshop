require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const estimateRoutes = require('./routes/estimates');
const beforeAfterRoutes = require('./routes/beforeAfter');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const testimonialRoutes = require('./routes/testimonials');

const app = express();
const cors = require('cors');


const uri = process.env.MONGODB_URI; 
const dbName = 'autoBodyShop';

// Serve React app from frontend/build
app.use(cors(
  [
    {
      "origin": ["http://localhost:3000"],
      "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      "maxAgeSeconds": 3600
    }
  ]
));
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
app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes)


// Serve React app for all routes
// app.get('*', (req, res) => {
//   res.sendFile(`${__dirname}\\frontend\\build\\index.html`);
// });


app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running on http://localhost:${process.env.PORT}`)
})