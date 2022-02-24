const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const { Schema , User , Validate} = require('../models/user');
const { use } = require('./genres');
const { func } = require('joi');

router.post('/',async(req,res)=>{
    const {error,value} = Validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user =  await User.findOne({email : req.body.email });
    if(user) return res.status(400).send("User already registered.");
    
    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password , salt);
    user.password = hashed;

    try{
        await user.save();
        res.send(_.pick(user,['_id','name','email']))
    }catch(ex){
        console.log(ex);
        res.status(500).send("something went wrong!")
    }
});


function validate(req){
    const Schema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(100).required()
    })
    return Schema.validate(user);
}