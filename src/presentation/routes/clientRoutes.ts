import { Router } from "express";
import { ClientRoute } from "./constants";
import { authMiddleware } from "../middlewares/authMiddleware";
import { clientOrFreelancer } from "../middlewares/roleMiddleware";
import { clientProfileController } from "../DI/User/Resolve";

export class ClientRoutes {
    clientRoutes = Router()

    constructor() {
        this.clientRoutes = Router()
        this.setRoutes()
    }

    private setRoutes(): void {
        this.clientRoutes.get(ClientRoute.CLIENTPROFILE, authMiddleware, clientOrFreelancer, (req, res) => {
            clientProfileController.getClientProfile(req, res)
        })

        this.clientRoutes.patch(ClientRoute.CLIENTPROFILE, authMiddleware, clientOrFreelancer, (req, res) => {
            clientProfileController.updateClientProfile(req, res)
        })

        this.clientRoutes.get(ClientRoute.DASHBOARD, authMiddleware, clientOrFreelancer, (req, res) => {
            clientProfileController.getDashboardStats(req, res)
        })
    }
}


