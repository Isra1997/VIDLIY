const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function (logger){
        mongoose.connect(`mongodb://${process.env.DB_Host}/${process.env.DB_Name}`,{useUnifiedTopology: true})
    .then(()=>logger.info('Connected to MongoDB..'))
}