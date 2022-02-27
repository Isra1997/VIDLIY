const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true,
        minlength : 5,
        maxlength: 50
    },
    email:{
        type: String,
        unique: true,
        trim: true,
        required: true,
        minlength : 5,
        maxlength: 255  
    },
    password :{
        type: String,
        required:true,
        minlength : 5,
        maxlength: 100  
    },
    isAdmin :{
        type:Boolean
    }
})

userSchema.methods.generateAuthToken = function (){
    console.log(this.isAdmin);
    return jwt.sign({_id:this._id, isAdmin : this.isAdmin},process.env.JWT_PRIVATE_KEY);
}

const userModel = mongoose.model('users', userSchema);

function validateUser(user){
    const Schema = Joi.object({
        name : Joi.string().min(5).max(255).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(100).required()
    })
    return Schema.validate(user);
}



exports.User = userModel;
exports.Schema = userSchema;
exports.Validate = validateUser;