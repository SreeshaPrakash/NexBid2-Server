import { Router } from "express";
import { UserRoute } from "./constants";
// import { UserRegisterController } from "../DI/UserInjection";
import { userController } from '../DI/User/Resolve';
import { authMiddleware } from '../middlewares/authMiddleware';

export class UserRoutes {

    public userRoutes = Router()

    constructor() {
        this.userRoutes = Router()
        this.setRoutes()
    }
    private setRoutes(): void {

        this.userRoutes.post(UserRoute.SIGNUP, (req, res) => {
            console.log('user singing in')
            userController.signup(req, res)
        })

        this.userRoutes.post(UserRoute.VERIFY_OTP, (req, res) => {
            userController.verifyOtp(req, res)
        })


        this.userRoutes.post(UserRoute.LOGIN, (req, res) => {
            userController.login(req, res)
        })

        this.userRoutes.post(UserRoute.RESEND_OTP, (req, res) => {
            userController.resendOtp(req, res)
        })

        this.userRoutes.post(UserRoute.GOOGLE_LOGIN, (req, res) => {
            userController.googleLogin(req, res)
        })

        this.userRoutes.post(UserRoute.FORGOT_PASSWORD, (req, res) => {
            userController.forgotPassword(req, res)
        })

        this.userRoutes.post(UserRoute.RESET_PASSWORD, (req, res) => {
            userController.resetPassword(req, res)
        })


        this.userRoutes.post(UserRoute.REFRESH_TOKEN, (req, res) => {
            userController.refreshToken(req, res)
        })

        this.userRoutes.post(UserRoute.SWITCH_ROLE, authMiddleware, (req, res) => {
            userController.switchRole(req, res)
        })

        this.userRoutes.post(UserRoute.LOGOUT, (req, res) => {
            userController.logout(req, res)
        })
    }

}



