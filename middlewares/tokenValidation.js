const jwt = require('jsonwebtoken');
require('dotenv').config();

const istokenValid = async(req,res,next)=>{
   const header = req.headers.authorization;
   const token = header.split('Bearer')[1].trim();
   jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
        if(err){
            res.status(401).json({msg:'User is not authorized..'});
        }
        req.user = decoded;
        next();
    })

   
}

module.exports = istokenValid;