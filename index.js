require('express-async-errors');
const express = require('express');
const app = express();


require("./startup/routes")(app);
const logger = require("./startup/logging")();
require("./startup/db")(logger);
require("./startup/config");
require("./startup/validation");


const port = 3000;
app.listen(port,()=>{
    logger.info(`listening on port number ${port}...`)
});
