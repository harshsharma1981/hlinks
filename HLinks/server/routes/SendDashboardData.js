
var express = require('express');
const SocialLinks = require('./models/SocialLinks');
var SendDashboardData = express.Router();

/* GET users listing. */
SendDashboardData.get('/', async function(req, res, next) {
try{
    const user = await SocialLinks.findOne({ username:req.username }); // Find user by username
        // Send the user data excluding sensitive information
        res.status(200).json({user,success:true
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error,success:false });
    }
});

module.exports = SendDashboardData;
