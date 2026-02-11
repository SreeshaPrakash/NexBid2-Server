import Redis from "ioredis";
import { logger } from "../infrastructure/logging/logger";

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
})

redis.on('connect', () => {
   logger.info('redis connected')
})

redis.on("error", (err) => {
    logger.info('Redis error : ', err)
})
export default redis