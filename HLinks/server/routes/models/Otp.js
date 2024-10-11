const mongoose = require('mongoose');

// Define the OTP schema
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure each email has a unique OTP
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m', // OTP expires after 10 minutes
  },
  // Optional: You can include a field to track the number of attempts
  attempts: {
    type: Number,
    default: 0,
  },
});

// Create the OTP model
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
