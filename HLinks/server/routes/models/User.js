const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Each user should have a unique username
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true, // Store the hashed password
    minlength: 6, // You can adjust this based on your security policy
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken=async function(){
    try {
  
      const token = jwt.sign({_id:this._id.toString()}, process.env.SECRETKEY,{ expiresIn: '720h' })
  return token
    } catch (error) {
      console.log("at generate token",error)
    }
    }
// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  // Hash the password only if it has been modified or is new
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hash = await bcrypt.hash(user.password, salt); // Hash the password with the salt
    user.password = hash; // Replace the plain text password with the hashed password
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
