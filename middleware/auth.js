const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try{
        const decode = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = decode;
        next();
    }catch(ex){
        return res.status(400).send('Invalid token.');
    }
}

module.exports = auth;