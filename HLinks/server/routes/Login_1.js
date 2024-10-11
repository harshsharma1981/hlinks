
  
  var express = require('express');
const User = require('./models/User');
var Login_1 = express.Router();

/* GET users listing. */
Login_1.post('/', function(req, res, next) {
const {email, password }= req.body
  const loginUser = async (email, candidatePassword) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return console.log('User not found');
      }
  
      // Compare the password entered by the user with the hashed password in the database
      const isMatch = await user.comparePassword(candidatePassword);
      const token = await user.generateAuthToken();

  

      if (isMatch) {
        res.status(201).json({success:"Login Successful",token})
      
     
        // Handle login (e.g., generate a JWT token)
      } else {
      
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  
  // Example usage
  loginUser(email,password);
  
});

module.exports = Login_1;
