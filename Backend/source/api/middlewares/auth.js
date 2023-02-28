const jwt = require('jsonwebtoken');
require("dotenv").config();

const validateToken = (req,res,next) =>{
    const accessToken = req.headers["authorization"];
    const token = accessToken.split(" ")[1];

    if(!token){
        return res.sendStatus(400).json({error:"User Not Authenticated"});
    }

    try{
        const validToken = verify(token,process.env.ACCESS_TOKEN_SECRET);
        if(validToken){
            req.authenticated = true;
            return next();
        }

    }catch(err){
         res.sendStatus(400).json({error:err});
    }
}

module.exports = {validateToken};