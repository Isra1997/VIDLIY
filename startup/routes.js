const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const express = require('express');


module.exports = function(app){
    //In case you forget we have 
    //req.query:
    //used to send numbers for sorting , filtering and pagination.
    //req.body
    //mainly used to send a lot of information in PUT/POST requests.
    //req.params
    //to send certain properties such as ID
    // we use this statement to parse the body of the request
    app.use(express.json());
    app.use('/api/vidly/genres', genres);
    app.use('/api/vidly/customers',customers);
    app.use('/api/vidly/movies',movies);
    app.use('/api/vidly/rentals',rentals);
    app.use('/api/vidly/users',users);
    app.use('/api/vidly/auth',auth);
    app.use(error);
    
} 