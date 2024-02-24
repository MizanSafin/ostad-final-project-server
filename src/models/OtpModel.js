const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

let OtpModel = mongoose.model("otp", otpSchema);
module.exports = OtpModel;
