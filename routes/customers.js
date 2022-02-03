const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Customer = require('../models/customer');

router.get('/',async(req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id',async(req,res)=>{
    const result = await Customer.findById({ _id : req.params.id});
    if(!result) return res.status(404).send("customer not found");
    res.send(result);
});

router.post('/',async(req,res)=>{
    const {error , value } = validateSchema(req.body);
    if(error) res.status(404).send(error.details[0].message);
    const newRecord = new Customer(req.body);
    try {
        const result = await newRecord.save();
        res.send(result);
    } catch (ex) {
        res.status(400).send(ex)
    }
})

router.put('/:id',async (req,res)=>{
    const updatedCustomer = await Customer.findByIdAndUpdate({ _id: req.params.id},{$set:{
        isGold : req.body.isGold,
        name : req.body.name,
        phone : req.body.phone
    }},{new : true})
    if(!updatedCustomer) return res.status(404).send("Customer with the given ID is not found.");
    res.send(updatedCustomer);
});


router.delete('/:id',async (req,res)=>{
    const removedCustomer = await Customer.findByIdAndRemove(req.params.id);
    if(!removedCustomer) return res.status(400).send("Customer with the given ID not found.");
    res.send(removedCustomer)
});

/////////////////////// Other Methods ///////////////////////

function validateSchema(genre){
    const schema = Joi.object({
        isGold : Joi.boolean,
        name : Joi.string().min(5).max(50).required(),
        phone : Joi.string().min(11).max(11).required()
    })

    return schema.validate(genre);
}


module.exports = router