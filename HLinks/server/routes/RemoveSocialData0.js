var express = require('express');
const SocialLinks = require('./models/SocialLinks');
var RemoveSocialData0 = express.Router();

/* GET users listing. */
RemoveSocialData0.post('/', async function(req, res, next) {

 try {
 const {id}=req.body
    const user = await SocialLinks.findOne({username:req.username})
    if (!user) {
        return res.status(500).json({err:"rr"})
    }
    const user2 = await SocialLinks.findOne({_id:id})
    if (user.username===user2.username){
    const result= await SocialLinks.deleteOne({_id:id})
   
    return res.status(200).json({    success:"success"})
    
    }
    else{
        return res.status(500).json({err:"rr"})
    
    }
 } catch (error) {
    
 }
});

module.exports = RemoveSocialData0;
