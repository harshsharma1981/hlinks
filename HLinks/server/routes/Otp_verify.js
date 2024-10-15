
  var express = require('express');
const Otp = require('./models/Otp');
const User = require('./models/User');
var Otp_verify = express.Router();

/* GET users listing. */
Otp_verify.post('/', async function(req, res, next) {
    const { username,email, otp,password } = req.body;


    try {
      const otpEntry = await Otp.findOne({ email });
      
      if (!otpEntry) {
        return res.status(400).json({ message: 'No OTP found for this email.' });
      }
      
      if (otpEntry.otp !== otp) {
        // Optional: Increment the attempts
        otpEntry.attempts += 1;
        await otpEntry.save();
        return res.status(400).json({ message: 'Invalid OTP.' });
      }
      const newUser = new User({
        username,
        email,
        password, // Password will be hashed automatically before saving
      });
      await newUser.save();
      const token = await newUser.generateAuthToken()
      res.send({status:"Successful Signup",token})
      // OTP is valid
     
      await Otp.deleteOne({ email }); // Delete the OTP entry after successful verification
    } catch (error) {
    console.log(error)
      res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
    
});

module.exports = Otp_verify;
