// db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://amit:amitsingh@cluster0.cyonpka.mongodb.net/ems?retryWrites=true",
      {
        useNewUrlParser: true
      }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;