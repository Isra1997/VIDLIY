const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const rentalSchema = new mongoose.Schema({
    customer: { type: new mongoose.Schema({name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone: {
        type: String,
        required: true,
        minlength:5,
        maxlength:255
    }}), required: true  },
    movie : {
        type :new mongoose.Schema({
            title :{type:String,
                trim : true,
                minlength: 5,
                maxlength:255,
                required:true},
                dailyRentalRate:{
                    type:Number,
                    required:true,
                    min:0,
                    max: 255
                }
        }),
        required : true
    },
    dateOut :{
      type: Date,
      required: true,
      default: Date.now
      
    },
    dateReturned: {
        type: Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
});

function validateRental(rental){
    const Schema = Joi.object({
        movieId : Joi.objectId().required(),
        customerId :Joi.objectId().required()
    });
    return Schema.validate(rental);
}

const Rental = mongoose.model('rental', rentalSchema);

exports.validate = validateRental;
exports.Schema = rentalSchema;
exports.Rental = Rental;