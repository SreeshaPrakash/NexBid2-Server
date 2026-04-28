import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, colorize, timestamp, printf, errors } = winston.format

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
        // Application Logs: Rotate daily, keep for 14 days, max 20MB per file
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info'
        }),
        // Error Logs: Rotate daily, keep for 14 days, max 20MB per file
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        })
    ]
})