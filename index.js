const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const mongoose = require('mongoose');
require('dotenv').config();


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

mongoose.connect(`mongodb://${process.env.DB_Host}/${process.env.DB_Name}`)
.then(console.log("Connected to Mongodb..."))
.catch(err => console.error("Could'nt connect to Mongodb..",err));



const port = 3000;
app.listen(port,()=>{
    console.log(`listening on port number ${port}...`);
});
