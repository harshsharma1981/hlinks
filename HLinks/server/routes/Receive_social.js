var express = require('express');
const SocialLinks = require('./models/SocialLinks');
var Receive_social = express.Router();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // Replace with your Cloudinary cloud name
    api_key: process.env.API_KEY,        // Replace with your Cloudinary API key
    api_secret: process.env.API_SECRET,  // Replace with your Cloudinary API secret
  });
Receive_social.post('/', async function(req, res, next) {
  try {
    const { profileImage, name, shortTitle, vanityLink, socialLinks } = req.body;
const username=req.username
const vanity = await SocialLinks.findOne({vanityLink:vanityLink})
if (vanity){
  return res.status(400).json({ error: 'Already link name taken' });

    
if (!profileImage) {
  return res.status(400).json({ message: 'No image provided' });
}
const base64Image = profileImage.split(';base64,').pop();

// Upload the image to Cloudinary
const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
  folder: 'uploads',  // Folder in Cloudinary where files will be stored
  resource_type: 'image',
});

// Respond with the Cloudinary image URL

      const newSocialLinks = new SocialLinks({
      username,
        profileImage:result.secure_url ,
        name,
        shortTitle,
        vanityLink,
        socialLinks,
      });
  
      await newSocialLinks.save();
      return res.status(201).json({ success: true,link:`https://hlinks.netlify.app/${vanityLink}`, imageUrl: result.secure_url , message: 'Social links saved successfully!' });
    } catch (error) {
    console.log(error);
      return res.status(500).json({ success: false, message: 'Error saving social links maybe you are trying to create 2nd page currently we provide only one page', error });
    }
});

module.exports = Receive_social;
