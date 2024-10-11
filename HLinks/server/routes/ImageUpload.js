var express = require("express");
var ImageUpload = express.Router();

/* GET home page. */

ImageUpload.post("/", async (req, res) => {
try {
    const { image } = req.body;


if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }
  const base64Image = image.split(';base64,').pop();

  // Upload the image to Cloudinary
  const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`, {
    folder: 'uploads',  // Folder in Cloudinary where files will be stored
    resource_type: 'image',
  });

  // Respond with the Cloudinary image URL
  res.status(200).json({ message: 'File uploaded successfully', imageUrl: result.secure_url });
      // You can perform additional operations with the uploaded image here.
  
} catch (error) {
console.log(error);
    return res.status(500).json({ success: false, message: 'Error saving social links maybe you are trying to create 2nd page currently we provide only one page', error });
    
}

});

module.exports = ImageUpload;
