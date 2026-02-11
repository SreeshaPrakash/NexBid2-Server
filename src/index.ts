import express, { Express } from 'express';
import { ConnectDB } from './infrastructure/db/ConnectDb';
import cors from "cors";
import { UserRoutes } from './presentation/routes/userRoute';
import { logger } from './infrastructure/logging/logger';


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
    }

    private setUserRoutes(): void {
        this.app.use('/api', new UserRoutes().userRoutes)
    }

    public async listen(): Promise<void> {
        const PORT = process.env.PORT || 3000
        await this.database.connect()


        this.app.listen(PORT, () => {
            // console.log(`Nexbid server running on port , ${PORT}`)
            logger.info(`Nexbid server running on port , ${PORT}`)
        })
    }
}

const app = new App()
app.listen()





