require("dotenv").config();
const {sign,verify, JsonWebTokenError} = require("jsonwebtoken");

const createTokens = (user)=>{
    const accessToken = sign({id:user.id},
        process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"});
    return accessToken;
}



module.exports = {createTokens};
