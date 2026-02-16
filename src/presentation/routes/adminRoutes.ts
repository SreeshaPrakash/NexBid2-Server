import { adminController, adminUserController } from "../DI/User/Resolve"
import { AdminRoute } from "./constants"
import { Router } from "express"

export class AdminRoutes {
    public adminRoutes = Router()

    constructor() {
        this.adminRoutes = Router()
        this.setRoutes()
    }

    private setRoutes(): void {
        this.adminRoutes.post(AdminRoute.LOGIN, (req, res) => {
            adminController.login(req, res)
        })

        this.adminRoutes.get(AdminRoute.GET_ALL_USERS, (req, res) => {
            adminUserController.getAllUsers(req, res)
        })

        this.adminRoutes.get(AdminRoute.GET_USER, (req, res) => {
            adminUserController.getUserById(req, res)
        })

        this.adminRoutes.patch(AdminRoute.TOGGLE_BLOCK_STATUS, (req, res) => {
            adminUserController.toggleBlockStatus(req, res)
        })
    }



}