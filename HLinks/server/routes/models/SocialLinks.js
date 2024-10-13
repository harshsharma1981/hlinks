// models/SocialLinks.js

const mongoose = require('mongoose');

const SocialLinkSchema = new mongoose.Schema({
    username: { type: String, unique:true, required: true },

  profileImage: { type: String, required: true },
  name: { type: String, required: true },
  shortTitle: { type: String, required: true },
  vanityLink: { type: String, unique:true, required: true },
  socialLinks: [
    {
      platform: { type: String, required: true },
      link: { type: String, required: true },
      icon: { type: String},
    },
  ],
      selectedTemplate :{ type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const SocialLinks = mongoose.model('SocialLinks', SocialLinkSchema);
module.exports = SocialLinks;
