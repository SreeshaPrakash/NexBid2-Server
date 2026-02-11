import { User } from './../../domain/entities/User';
import { Router } from "express";
import { UserRoute } from "./constants";
import { UserRegisterController } from "../DI/UserInjection";

export class UserRoutes {
    ;
    public userRoutes = Router()

    constructor() {
        this.userRoutes = Router()
        this.setRoutes()
    }
    private setRoutes(): void {

        this.userRoutes.post(UserRoute.SIGNUP, (req, res) => {
            UserRegisterController.signup(req, res)
        })

        this.userRoutes.post(UserRoute.VERIFY_OTP, (req, res) => {
            UserRegisterController.verifyOtp(req, res)
        })

        this.userRoutes.post(UserRoute.LOGIN, (req, res) => {
            UserRegisterController.login(req, res)
        })

        this.userRoutes.post(UserRoute.RESEND_OTP, (req ,res) =>{
            UserRegisterController.resendOtp(req,res)
        })

        this.userRoutes.post(UserRoute.GOOGLE_LOGIN, (req,res)=>{
            UserRegisterController.googleLogin(req,res)
        })

        this.userRoutes.post(UserRoute.FORGOT_PASSWORD, (req, res)=>{
            UserRegisterController.forgotPassword(req,res)
        })
        
        this.userRoutes.post(UserRoute.RESET_PASSWORD, (req,res) => {
            UserRegisterController.resetPassword(req ,res)
        })


        this.userRoutes.post(UserRoute.REFRESH_TOKEN, (req,res)=>{
            UserRegisterController.refreshToken(req,res)
        })
    }

}