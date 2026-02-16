
// import winston from "winston";

// const { combine, colorize, timestamp, printf} = winston.format

// const logFormat = printf(({level, message, timestamp}) => {
//     return ` ${timestamp} [${level}] : ${message}`
// })

// export const logger = winston.createLogger({
//     level : 'info',
//     format : combine(
//         colorize({all : true}),
//         timestamp({format : "YYYY-MM-DD hh:mm:ss A" }),
//         logFormat
//     ),

//     transports : [ new winston.transports.Console() ]
// })





























import winston from "winston";

const { combine, colorize, timestamp, printf, errors, json } = winston.format

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return ` ${timestamp} [${level}] : ${stack || message}`
})

export const logger = winston.createLogger({
    level: 'info',

    format: combine(
        timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
        errors({ stack: true }),
        logFormat
    ),

    transports: [
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
                logFormat
            ),
        }),
        new winston.transports.File({
            filename: "logs/app.log",
            level: "info"
        }),
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        })
    ]
})