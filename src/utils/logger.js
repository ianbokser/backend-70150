import winston from 'winston';

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: 'debug' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

export default logger;
