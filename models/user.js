const mongoose = require('mongoose');
const Joi = require('joi');

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
    }
})

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