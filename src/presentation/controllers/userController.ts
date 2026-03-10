import { injectable, inject } from 'tsyringe';

import { IUserRegisterUsecase } from "../../domain/interfaces/usecaseInterface/user/IUserRegisterUsecase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../shared/httpStatusCode";
import { MESSAGES } from "../../shared/messages";
import { IVerifyOtpUsecase } from "../../domain/interfaces/usecaseInterface/user/IVerifyOtpUsecase";
import { ILoginUsecase } from "../../domain/interfaces/usecaseInterface/user/ILoginUsecase";
import { IResendOtpusecase } from "../../domain/interfaces/usecaseInterface/user/IResendOtpUsecase";
import { IGoogleLoginUsecase } from "../../domain/interfaces/usecaseInterface/user/IGoogleLoginUsecase";
import { IForgotPasswordUsecase } from "../../domain/interfaces/usecaseInterface/user/IForgotPasswordUsecase";
import { IResetPasswordUsecase } from "../../domain/interfaces/usecaseInterface/user/IResetPasswordUsecase";
import { IRefreshTokenUsecase } from "../../domain/interfaces/usecaseInterface/user/IRefreshTokenUsecase";
import { logger } from '../../infrastructure/logging/logger';
import { ISwitchRoleUsecase } from '../../domain/interfaces/usecaseInterface/user/ISwitchRoleUsecase';
import { ILogoutUsecase } from '../../domain/interfaces/usecaseInterface/user/ILogoutUsecase';

@injectable()
export class UserController {

    constructor(
        @inject("IUserRegisterUsecase") private _userRegisterUsecase: IUserRegisterUsecase,
        @inject("IVerifyOtpUsecase") private _verifyOtpUsecase: IVerifyOtpUsecase,
        @inject("ILoginUsecase") private _loginUsecase: ILoginUsecase,
        @inject("IResendOtpusecase") private _resendOtpUsecase: IResendOtpusecase,
        @inject("IGoogleLoginUsecase") private _googleLoginUsecase: IGoogleLoginUsecase,
        @inject("IForgotPasswordUsecase") private _forgotPasswordUsecase: IForgotPasswordUsecase,
        @inject("IResetPasswordUsecase") private _resetPasswordUsecase: IResetPasswordUsecase,
        @inject("IRefreshTokenUsecase") private _refreshTokenUsecase: IRefreshTokenUsecase,
        @inject("ISwitchRoleUsecase") private _switchRoleUsecase: ISwitchRoleUsecase,
        @inject("ILogoutUsecase") private _logoutUsecase: ILogoutUsecase
    ) { }

    signup = async (req: Request, res: Response) => {

        try {
            const user = await this._userRegisterUsecase.execute(req.body)
            console.log('user registering, otp send')
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
console.log('otp verifying')
            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.OTP_VERIFY_SUCCESS,
                user
            })

        } catch (error: any) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                success: true,
                message: MESSAGES.OTP_VERIFY_FAILED || error.message
            })
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const result = await this._loginUsecase.execute(req.body)

            const { accessToken, refreshToken, user } = result;

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.LOGIN_SUCCESS,
                accessToken,
                user
            })

        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: error.message || MESSAGES.LOGIN_FAILED
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
            logger.info(`Google login successful`, result.user.email)


            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: message,
                user: result.user,
                accessToken: result.accessToken,
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
            // const { refreshToken } = req.body
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: MESSAGES.REFRESHTOKEN_REQUIRED
                })
            }

            const result = await this._refreshTokenUsecase.execute(refreshToken)
            logger.info(MESSAGES.TOKEN_REFRESH_SUCCESS)

            res.cookie('refreshToken', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.TOKEN_REFRESH_SUCCESS,
                accessToken: result.accessToken,
                user: result.user
            });


        } catch (error: any) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: error.message || MESSAGES.TOKEN_REFRESH_FAILED
            })
        }
    }

    switchRole = async (req: Request, res: Response) => {
        try {
            if (!req.user) {
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }
            const { requestedRole } = req.body
            const result = await this._switchRoleUsecase.execute(
                req.user.userId, requestedRole
            )

            return res.status(HttpStatusCode.OK).json({
                success: true,
                message: 'Role switched Successfuly',
                data: result
            })

        } catch (error: any) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success: false,
                message: error.message || "Failed to switch role"
            })
        }
    }



    logout = async (req: Request, res: Response) => {
        try {
            await this._logoutUsecase.execute();

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            });

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || 'Logout failed'
            });
        }
    }

}







