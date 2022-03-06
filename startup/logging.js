const winston = require('winston');
require('winston-mongodb');

module.exports =  function (){
    const logger = winston.createLogger({
        transports: [
          new winston.transports.File({ filename: 'combined.log',
                                    format: winston.format.combine(
                                    winston.format.timestamp({
                                        format: 'YYYY-MM-DD hh:mm:ss A ZZ'
                                    }),
                                    winston.format.json()),
          handleExceptions: true}),
          new winston.transports.MongoDB({db:`mongodb://${process.env.DB_Host}/${process.env.DB_Name}`,options: {
            useUnifiedTopology: true,
        }})
        ]
    });
    process.on('uncaughtException',(ex)=>{
        logger.error(ex.message,ex); 
        process.exit(1);
    })
    
    
    process.on('unhandledRejection',(ex)=>{
        logger.error(ex.message,ex); 
        process.exit(1);
    })

    return logger;
}