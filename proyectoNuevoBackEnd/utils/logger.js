import winston from "winston";
import * as dotenv from 'dotenv';


dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV;
const DEVELOPMENT = process.env.NODE_DEV;

const desarrollo = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        'fatal': 'red',
        'error': 'red',
        'warning': 'yellow',
        'info': 'green',
        'http': 'green',
        'debug': 'blue'
    }
}

// Custom logger
const logger = winston.createLogger({
    levels: desarrollo.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: desarrollo.colors
                }),
                winston.format.simple()
            )
        }),
        // new winston.transports.File({
        //     filename: 'logs/dev_custom.log',
        //     level: 'fatal'
        // })
    ]
});

const produccion = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        'fatal': 'red',
        'error': 'red',
        'warning': 'yellow',
        'info': 'green',
        'http': 'green',
        'debug': 'blue'
    }
}
// Custom logger
const loggerProd = winston.createLogger({
    levels: produccion.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({
                    all: true,
                    colors: produccion.colors
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error'
        })
    ]
});
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console({
//             level: 'info'
//         }),
//         new winston.transports.File({
//             filename: 'logs/dev.log',
//             level: 'warn'
//         })
//     ]
// });

//Ejercicio multientorno
// let logger;

// if (ENVIRONMENT === 'production') {
//     logger = winston.createLogger({
//         transports: [
//             new winston.transports.Console({
//                 level: 'http'
//             }),
//             new winston.transports.File({
//                 filename: 'logs/prod.log',
//                 level: 'warn'
//             })
//         ]
//     })
// } else {
//     logger = winston.createLogger({
//         transports: [
//             new winston.transports.Console({
//                 level: 'verbose'
//             })
//         ]
//     })
// }



export const addLogger = (req, res, next) => {
    req.logger = logger;
    // req.logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    req.logger.debug(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}

export const addLoggerProd = (req, res, next) => {
    req.loggerProd = loggerProd;
    // req.logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
}