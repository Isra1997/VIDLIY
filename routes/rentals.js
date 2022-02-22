const express = require('express');
const router = express.Router();
const {Rental , validate} = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
// const Fawn = require('fawn');

// Fawn.init(`mongodb://${process.env.DB_Host}/${process.env.DB_Name}`,'rentals');


router.get('/',async(req,res)=>{
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
})


router.get('/id',async(req,res)=>{
    const rentals = await Rental.findById(req.params.id);
    if(!rentals) return res.status(400).send('No rental was found with the given Id');
    res.send(rentals);
})

router.post('/', async(req,res)=>{
        const session = await mongoose.startSession();
        //validate that the client sent the correct request body
        const {error , value } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findById( req.body.customerId);
        const movie =  await Movie.findById(req.body.movieId);
        //validate that the customer and the movie are present
        if(!customer) return res.status(400).send("The customer with the given Id is not found.");
        if(!movie) return res.status(400).send("The movie with the given Id is not found.");

        if(movie.numberInStock === 0) return res.status(400).send('This movie is out of stock');

        const dateOut = new Date();
        const dateReturned = new Date();
        dateReturned.setDate(dateOut.getDate()+5)

        //create the rental document
        const rental = {
            customer: { 
                 _id : customer._id,
                 name: customer.name,
                 phone: customer.phone
            },
            movie : {
                _id : movie._id,
                title : movie.title,
                dailyRentalRate : movie.dailyRentalRate
            },
        }

        const newRental = new Rental(rental);
        try{
            await session.withTransaction(async () => {
            const result = await newRental.save();
            movie.numberInStock--;
            const resultMovie = movie.save();
        });}catch(ex){
            return res.status(500).send('Something went wrong !');
        }
        session.endSession();
        res.send(rental);
});

router.put('/:id',async(req,res)=>{
    const {error , value} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const session = await mongoose.startSession();
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send("The movie with the given Id is not found.");
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(400).send("The rental with the given Id is not found.");
    try{
        session.withTransaction(async()=>{
           
            movie.numberInStock ++ ;
            movie.save();
           
            rental.dateReturned = new Date();
            //  time difference of two dates
            var Difference_In_Time =new Date().getTime() - rental.dateOut.getTime() ;
            // no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            rental.rentalFee = 5 * Difference_In_Days;
            console.log( 5 * Difference_In_Days);
            rental.save();
        });

    }catch(ex){
            return res.status(500).send('something went wrong !');
    }

    return res.send(rental)

})

router.delete('/:id',async(req,res)=>{
    
    const rental =  await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("Rental with the given ID not found.");
    const session = await mongoose.startSession();
    try{
        await session.withTransaction(async () => {
           const movie = await Movie.findById(rental.movie.id);
           movie.numberInStock++;
           movie.save();
           const removedRental = await Rental.findByIdAndRemove(req.params.id);
    });
}catch(ex){
        console.log(ex);
       return res.status(500).send('Something went wrong !');
    }
   
    return res.send(rental);
})

module.exports = router