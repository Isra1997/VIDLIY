const mongoose = require('mongoose');
const genreSchema = require('../models/genre').schema;
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title:{type:String,
        min :5,
        max:255,
        required:true},
    genre:{type:genreSchema,
        min :5,
        max:255,
        required:true},
    numberInStock:{
        type: Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type: Number,
        required:true,
        min:0,
        max:255
    },
});

const Movie = mongoose.model('movie', movieSchema);

//validates client input
function validateMovie(movie){
    const schema = Joi.object({
        title : Joi.string.required(),
        genreId : Joi.string().required(),
        numberInStock : Joi.number().required(),
        dailyRentalRate : Joi.number().required()
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie