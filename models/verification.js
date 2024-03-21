const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
  },
  { timestamps: true }
);

const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;
