
var express = require('express');
const SocialLinks = require('./models/SocialLinks');
var SendSocialData = express.Router();

/* GET users listing. */
SendSocialData.get('/:vanityLink',async function(req, res, next) {
  // routes/socialLinks.js



// GET route to fetch user social links

  try {

    const socialLinks = await SocialLinks.findOne({ vanityLink: req.params.vanityLink });
    
    if (!socialLinks) {
console.log(req.params.vanityLink ,socialLinks)
      return res.status(404).json({ success: false, message: 'Social links not found' });
    }

    res.json({ success: true, socialLinks });
  } catch (error) {
  console.log(error);
    res.status(500).json({ success: false, message: 'Server error', error });
  }
});



module.exports = SendSocialData;
