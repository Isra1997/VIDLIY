const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_Host}/${process.env.DB_Name}`)
.then(console.log("Connect to Mongodb..."))
.catch(err => console.error("Could'nt connect to Mongodb..",err));