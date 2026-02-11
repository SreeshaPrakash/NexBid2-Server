import { User } from './../../domain/entities/User';
import { RefreshTokenUsecase } from './../../application/usecases/refreshTokenUsecase';
import { IUserRegisterUsecase } from "../../domain/interfaces/usecaseInterface/user/IUserRegisterUsecase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../shared/httpStatusCode";
import { MESSAGES } from "../../shared/messages";
import { IVerifyOtpUsecase } from "../../domain/interfaces/usecaseInterface/user/IVerifyOtpUsecase";
import { success } from "zod";
import { ILoginUsecase } from "../../domain/interfaces/usecaseInterface/user/ILoginUsecase";
import { tr } from "zod/v4/locales";
import { IResendOtpusecase } from "../../domain/interfaces/usecaseInterface/user/IResendOtpUsecase";
import { IGoogleLoginUsecase } from "../../domain/interfaces/usecaseInterface/user/IGoogleLoginUsecase";
import { access } from "node:fs";
import { IForgotPasswordUsecase } from "../../domain/interfaces/usecaseInterface/user/IForgotPasswordUsecase";
import { IResetPasswordUsecase } from "../../domain/interfaces/usecaseInterface/user/IResetPasswordUsecase";
import { IRefreshTokenUsecase } from "../../domain/interfaces/usecaseInterface/user/IRefreshTokenUsecase";
import { logger } from '../../infrastructure/logging/logger';
export class UserController {

    constructor(
        private _userRegisterUsecase: IUserRegisterUsecase,
        private _verifyOtpUsecase: IVerifyOtpUsecase,
        private _loginUsecase: ILoginUsecase,
        private _resendOtpUsecase: IResendOtpusecase,
        private _googleLoginUsecase: IGoogleLoginUsecase,
        private _forgotPasswordUsecase: IForgotPasswordUsecase,
        private _resetPasswordUsecase: IResetPasswordUsecase,
        private _refreshTokenUsecase: IRefreshTokenUsecase
    ) { }

    signup = async (req: Request, res: Response) => {

        try {
            const user = await this._userRegisterUsecase.execute(req.body)

            res.status(HttpStatusCode.CREATED).json({
                success: true,
                message: MESSAGES.REGISTRATION_SUCCESS,
                user,
            })

        } catch (error: any) {

            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.REGISTRATION_FAILED || error.message
            })
        }
    }

    verifyOtp = async (req: Request, res: Response) => {
        try {
            const { otp, email } = req.body
            const user = await this._verifyOtpUsecase.execute({ otp, email })

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.OTP_VERIFY_SUCCESS,
                user
            })

        } catch (error: any) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: true,
                message: MESSAGES.OTP_VERIFY_SUCCESS || error.message
            })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this._loginUsecase.execute(req.body)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.LOGIN_SUCCESS,
                ...result
            })

        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: MESSAGES.LOGIN_FAILED || error.failed
            })
        }
    }


    resendOtp = async (req: Request, res: Response) => {
        try {

            const { email } = req.body
            if (!email) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: MESSAGES.EMAIL_REQUIRED
                })
            }
            await this._resendOtpUsecase.execute(email)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.OTP_RESEND_SUCCESS,
            })

        } catch (error: any) {
            res.status(HttpStatusCode.CONFLICT).json({
                success: false,
                message: MESSAGES.OTP_RESEND_FAILED || error.message
            })

        }
    }


    googleLogin = async (req: Request, res: Response) => {
        try {
            const { idToken } = req.body
            if (!idToken) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: MESSAGES.GOOGLE_ID_TOKEN_REQUIRED
                })
            }

            const result = await this._googleLoginUsecase.execute(idToken)
            const message = result.isNewUser ? MESSAGES.GOOGLE_SIGNUP_SUCCESS : MESSAGES.GOOGLE_LOGIN_SUCCESS
            // console.log(`Google login successful`, result.user.email)
            logger.info(`Google login successful`, result.user.email)


            res.status(HttpStatusCode.OK).json({
                success: true,
                message: message,
                user: result.user,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                isNewUser: result.isNewUser
            })

        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: error.message || MESSAGES.GOOGLE_LOGIN_FAILED
            })
        }
    }


    forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            if (!email) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: MESSAGES.EMAIL_REQUIRED
                })
            }
            await this._forgotPasswordUsecase.execute(email)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.OTP_RESEND_SUCCESS
            })
        } catch (error) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.OTP_RESEND_FAILED
            })
        }
    }


    resetPassword = async (req: Request, res: Response) => {

        try {
            await this._resetPasswordUsecase.execute(req.body)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.PASSWORD_RESET_SUCCESS
            })
        } catch (error) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.PASSWORD_RESET_FAILED
            })
        }
    }


    refreshToken = async (req: Request, res: Response) => {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) {
                return res.send(HttpStatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: MESSAGES.REFRESHTOKEN_REQUIRED
                })
            }

            const result = await this._refreshTokenUsecase.execute(refreshToken)
            logger.info(MESSAGES.TOKEN_REFRESH_SUCCESS)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.TOKEN_REFRESH_SUCCESS,
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            });


        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: error.message || MESSAGES.TOKEN_REFRESH_FAILED
            })
        }
    }

    // getProfile = async(req: Request , res : Response) =>{
    //     try {
    //         const userId = req.user
    //     } catch (error) {

    //     }
    // }


}




