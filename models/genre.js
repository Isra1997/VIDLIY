const mongoose = require('mongoose');

const generaSchema = new mongoose.Schema({
    name:{type:String,
        minlength : 5,
        maxlength : 50,
        required:true}
})

const Genre = mongoose.model('genera', generaSchema);

module.exports = Genre;