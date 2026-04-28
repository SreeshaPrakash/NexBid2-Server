import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddleware"
import { clientOrFreelancer } from "../middlewares/roleMiddleware"
import { freelancerProfileController } from "../DI/User/Resolve"
import { FreelancerRoute } from "./constants"


export class FreelancerRoutes {
    freelancerRoutes = Router()

    constructor() {
        this.freelancerRoutes = Router()
        this.setRoutes()
    }

    private setRoutes(): void {

        this.freelancerRoutes.post(FreelancerRoute.FREELANCER_PROFILE, authMiddleware, clientOrFreelancer, (req, res) => {
            freelancerProfileController.createProfile(req, res)
        })

        this.freelancerRoutes.get(FreelancerRoute.FREELANCER_PROFILE, authMiddleware, clientOrFreelancer, (req, res) => {
            freelancerProfileController.getProfile(req, res)
        })

        this.freelancerRoutes.post(FreelancerRoute.VERIFY_REQUEST, authMiddleware, clientOrFreelancer, (req, res) => {
            freelancerProfileController.requestVerification(req, res)
        })

        this.freelancerRoutes.patch(FreelancerRoute.FREELANCER_PROFILE, authMiddleware, clientOrFreelancer, (req, res) => {
            freelancerProfileController.UpdateFreelancerProfile(req, res)
        })

        this.freelancerRoutes.get(FreelancerRoute.DASHBOARD_STATS, authMiddleware, clientOrFreelancer, (req, res) => {
            freelancerProfileController.getDashboardStats(req, res)
        })

    }
}


