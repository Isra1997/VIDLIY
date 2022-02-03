const express = require('express');
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use('/api/vidly/genres', genres)

console.log(process.env.DB_Host ,process.env.DB_Name);
mongoose.connect(`mongodb://${process.env.DB_Host}/${process.env.DB_Name}`)
.then(console.log("Connect to Mongodb..."))
.catch(err => console.error("Could'nt connect to Mongodb..",err));

const port = 3000;
app.listen(port,()=>{
    console.log(`listening on port number ${port}...`);
});
