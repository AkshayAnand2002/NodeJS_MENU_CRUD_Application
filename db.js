const mongoose = require("mongoose");
require("dotenv").config();
//define mongodb connection and url
// const mongoURL = "mongodb://127.0.0.1:27017/hotels"; //given a db name
const mongoURL = process.env.MONGODB_URL;
//setup mongodb connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//get the default connection
//mongoose maintains a default connection object representing mongodb connection.
const db = mongoose.connection;
//define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server.");
});
db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected.");
});
//Export thee database connections
module.exports = db;
