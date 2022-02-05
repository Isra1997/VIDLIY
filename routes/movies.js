const express = require('express');
const router = express.Router();
const {Movie, validate } = require('../models/movie');
const {Genre} = require('../models/genre');

router.get('/',async(req,res)=>{
    const movies = await Movie.find().sort('genre');
    res.send(movies);
});

router.get('/:id',async(req,res)=>{
    const result = await Movie.findById({ _id : req.params.id});
    if(!result) return res.status(404).send("Movie not found.");
    res.send(result);
});

router.post('/',async(req,res)=>{
    const {error , value } = Movie.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genre.id);
    if(!genre) return res.status(400).send("Invalid genre.");
    const newRecord = new Movie(req.body);
    try {
        const result = await newRecord.save();
        res.send(result);
    } catch (ex) {
        res.status(400).send(ex)
    }
})

router.put('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.body.genre.id);
    if(!genre) return res.status(400).send("Invalid genre.");
    const updatedMovie = await Movie.findByIdAndUpdate({ _id: req.params.id},{$set:{
        title : req.body.title,
        genre : {
            _id: genre.id,
            name: genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate :  req.body.dailyRentalRate
    }},{new : true})
    if(!updatedMovie) return res.status(404).send("Movie with the given ID is not found.");
    res.send(updatedMovie);
});


router.delete('/:id',async (req,res)=>{
    const removedMovie = await Movie.findByIdAndRemove(req.params.id);
    if(!removedMovie) return res.status(400).send("Customer with the given ID not found.");
    res.send(removedMovie)
});

module.exports = router