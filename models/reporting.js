const mongoose = require("mongoose");

const reportingSchema = new mongoose.Schema(
  {
    complaint_id: { type: String, required: true },
    complainants_name: { type: String, required: true },
    complaint_title: { type: String, required: true },
    complaint_date: { type: Date, required: true },
    complaint_category: { type: String, required: true },
    description: { type: String, required: true },
    work_status: { type: String, required: true },
    reason: { type: String },
    vote: { type: Number },
    user_id: { type: String, required: true, ref: "User" },
    sentiments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sentiment" }],
  },
  { timestamps: true }
);

const Reporting = mongoose.model("Reporting", reportingSchema);

module.exports = Reporting;
