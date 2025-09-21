// models/Comparison.js
const mongoose = require("mongoose");


const comparisonSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dev1: {
    username: String,
    profileUrl: String,
    followers: Number,
    publicRepos: Number,
  },
  dev2: {
    username: String,
    profileUrl: String,
    followers: Number,
    publicRepos: Number,
  },
  winner: { type: String }, // "dev1" | "dev2" | "tie"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comparison", comparisonSchema);
