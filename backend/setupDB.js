require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
const dbName = 'autoBodyShop';


async function setupDatabase() {
  try {
    await mongoose.connect(uri, {
      dbName
    });
    console.log('Connected to MongoDB');

    // Clear existing collections (optional, for development)
    await mongoose.connection.db.dropCollection('estimates', () => {});
    await mongoose.connection.db.dropCollection('beforeafters', () => {});
    console.log('Dropped existing collections');

    // Create collections based on models
    const Estimate = require('./models/Estimate');
    const BeforeAfter = require('./models/BeforeAfter');
    await Estimate.createCollection();
    await BeforeAfter.createCollection();
    console.log('Estimates and BeforeAfter collections created');


  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

setupDatabase();
