const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold :{type:Boolean , default : false},
    name : {type:String, required :true},
    phone : {type:Number , required :true}
})

const customer = mongoose.model('Customer', customerSchema);

module.exports = customer;