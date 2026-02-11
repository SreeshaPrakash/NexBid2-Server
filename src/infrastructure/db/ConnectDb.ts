
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { logger } from "../logging/logger";

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ""

export class ConnectDB {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URI)
            // console.log('MongoDB connected successfully')
            logger.info('MOngoDB connected successfully')
        } catch (error) {
            // console.error('MongoDB connection error:', error);
            logger.error('MongoDB connection error :', error)
            process.exit(1);
        }
    }
}