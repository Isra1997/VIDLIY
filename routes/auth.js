const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User} = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/',async(req,res)=>{
    const {error,value} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user =  await User.findOne({email : req.body.email });
    if(!user) return res.status(400).send("Invalid email or password1.");

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password.");

    const token = jwt.sign({ _id:user._id },process.env.JWT_PRIVATE_KEY);

    res.send(token);
});


function validate(req){
    const Schema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(100).required()
    })
    return Schema.validate(req);
}

module.exports = router;