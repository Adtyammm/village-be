const mongoose = require("mongoose");

const sentimenSchema = new mongoose.Schema({
  text: { type: String },
  sentiment_label: { type: String },
});

const Sentiment = mongoose.model("Sentiment", sentimenSchema);

module.exports = Sentiment;
