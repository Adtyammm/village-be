const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    nik: { type: String, required: true },
    password: { type: String, required: true },
    account_state: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
