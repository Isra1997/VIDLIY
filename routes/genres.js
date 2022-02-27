const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/',async(req,res)=>{
    const genres = await Genre.Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id',async(req,res)=>{
    const result = await Genre.Genre.findById({ _id : req.params.id});
    if(!result) return res.status(404).send("genre not found");
    res.send(result);
});


router.post('/', auth , async(req,res)=>{
        const {error , value } = Genre.Genre.validate(req.body);
        if(error) res.status(400).send(error.details[0].message);
        const newRecord = new Genre.Genre(req.body);
        try {
            const result = await newRecord.save();
            res.send(result);
        } catch (ex) {
            res.status(400).send(ex)
        }
})


router.put('/:id', auth ,async (req,res)=>{
    const {error , value } = Genre.Genre.validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const updatedGenre = await Genre.Genre.findByIdAndUpdate({ _id: req.params.id},{$set:{
        name : req.body.name,
    }},{new : true})
    if(!updatedGenre) res.status(404).send("Genre with the given ID is not found.");
    res.send(updatedGenre);
});

router.delete('/:id',[auth,admin] , async (req,res)=>{
    const removedGenre = await Genre.Genre.findByIdAndRemove(req.params.id);
    console.log(removedGenre);
    if(!removedGenre) return res.status(404).send("Genre with the given ID not found.");
    res.send(removedGenre)
});



module.exports = router