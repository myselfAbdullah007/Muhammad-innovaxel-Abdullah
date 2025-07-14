require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const {
  MONGO_URI,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const uri = MONGO_URI ||
  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

function connectMongo() {
  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = connectMongo; 