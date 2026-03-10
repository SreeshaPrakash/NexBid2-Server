
import "reflect-metadata"; //for tsyringe to read class

import express, { Express } from 'express';
import { ConnectDB } from './infrastructure/db/ConnectDb';
import cors from "cors";
import { UserRoutes } from './presentation/routes/userRoute';
import { AdminRoutes } from "./presentation/routes/adminRoutes";
import { FreelancerRoutes } from "./presentation/routes/freelancerRoutes";
import { ClientRoutes } from "./presentation/routes/clientRoutes";
import { logger } from './infrastructure/logging/logger';
import cookieParser from "cookie-parser";


export class App {
    private app: Express
    private database: ConnectDB

    constructor() {
        this.app = express()
        this.database = new ConnectDB()

        this.initializeMiddlewares()
        this.setUserRoutes()
    }

    private initializeMiddlewares(): void {
        this.app.use(
            cors({
                origin: process.env.CLIENT_URL,
                credentials: true
            })
        )

        this.app.use(express.json())
        this.app.use(cookieParser())
    }

    private setUserRoutes(): void {
        this.app.use('/api', new UserRoutes().userRoutes)
        this.app.use('/api/admin', new AdminRoutes().adminRoutes)
        this.app.use('/api/freelancer', new FreelancerRoutes().freelancerRoutes)
        this.app.use('/api/client', new ClientRoutes().clientRoutes)
    }

    public async listen(): Promise<void> {
        const PORT = process.env.PORT || 3000
        await this.database.connect()


        this.app.listen(PORT, () => {
            logger.info(`Nexbid server running on port , ${PORT}`)
        })
    }
}

const app = new App()
app.listen()



