require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const uri = process.env.URI;

let dbConnection;

const connectDb = async () => {
  try {
    dbConnection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.log("Error in connecting with MongoDB", err);
  }
};

const disconnectDb = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log("Error in disconnecting from MongoDB", err);
  }
};

module.exports = { connectDb, disconnectDb, dbConnection };