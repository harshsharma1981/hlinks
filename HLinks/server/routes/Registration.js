var express = require('express');
const nodemailer = require('nodemailer');
const Otp = require('./models/Otp');
const User = require('./models/User');

var Registeration = express.Router();
// Store OTPs and user info temporarily (In-memory for demo)

// Email Transporter setup using Nodemailer

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
// Helper function to send OTP email
const sendOtpEmail = async (email, otp) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Signup',
        text: `Your OTP for signup is: ${otp}`,
      };
    
      try {
        return await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error('Error in sendOtpEmail:', error);
        throw new Error('Failed to send OTP email');
      }
};

// Route: Handle Signup and Send OTP
Registeration.post('/', async function(req, res,next) {
try {
    const { username,email, password } = req.body;

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await Otp.findOne({email:email})
    const user2 = await User.findOne({email:email})
    const user3 = await User.findOne({username:username})
  if (user2) {
    return  res.status(400).json({ message: "user with gmail already exist" });

  }
  if (user3) {
    return  res.status(400).json({ message: "user with username already exist" });

  }
  if (user ) {
    await Otp.deleteOne({email:email})
  }
    // Store the OTP and user info temporarily
    const otpEntry = new Otp({
        email: email,  // Set email
        otp: otp,      // Set OTP
      });
  
      // Save the document to the database
      await otpEntry.save();
  
    // Send the OTP to the user's email
    try {
      await sendOtpEmail(email, otp);
      res.status(200).json({ message: 'OTP sent to email.' });
    } catch (error) {
    console.log(error);
      // res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }  
} catch (error) {
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]; // Field that caused the error
    res.status(400).json({
      message: `Duplicate value for field: ${field}`,
      field: field, // You can also return the field name in the error
    });
  } else {
    // Handle other errors
    res.status(500).json({ message: 'Server error', error });
  }
    console.log(error)
}
 
});

module.exports = Registeration;
