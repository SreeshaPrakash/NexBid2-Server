
import { injectable, inject } from "tsyringe";
import { IAdminLoginUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IAdminLoginUsecase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { MESSAGES } from "../../../shared/messages";


@injectable()
export class AdminController {
    constructor(
        @inject("IAdminLoginUsecase") private _adminLoginUsecase: IAdminLoginUsecase
    ) { }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const result = await this._adminLoginUsecase.execute(req.body)

            res.status(HttpStatusCode.OK).json({
                success: true,
                message: MESSAGES.LOGIN_SUCCESS,
                ...result
            })
        } catch (error: any) {
            res.status(error.statusCode || HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message: error.message || MESSAGES.LOGIN_FAILED
            })
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
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