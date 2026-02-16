
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

    login = async (req: Request, res: Response) => {
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



}