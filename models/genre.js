const mongoose = require('mongoose');
const Joi = require('joi');

const generaSchema = new mongoose.Schema({
    name:{type:String,
        minlength : 5,
        maxlength : 50,
        required:true}
})

const Genre = mongoose.model('genera', generaSchema);

function validateGenre(genre){
    const schema = Joi.object({
        name : Joi.string().min(5).max(50).required()
    })

    return schema.validate(genre);
}
exports.Genre = Genre;
exports.validate = validateGenre;
exports.schema = generaSchema;