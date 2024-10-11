
const jwt =require("jsonwebtoken");
const User = require("../models/User");

/* GET users listing. */
const Auth = async(req, res,next) => {
   
    try {

        const token =  req.header("Authorization")

        if (!token){
      
            return res.status(400).json({ error: 'Auth error' });

        }
        else{
            t2=token.replace("Bearer", "").trim()
            const veryfyuser = jwt.verify(t2, process.env.SECRETKEY)
            const user = await User.findOne({_id:veryfyuser._id})
            const randomId = await User.findOne({_id:veryfyuser._id}).select("randomId")
            req.token= t2
            req.randomId= randomId
            req.username =user.username
    
           
            next()
        }
       
   
  
   
    
    } catch (error) {
    
        res.status(401).json({error})

    }
};


module.exports = Auth;

