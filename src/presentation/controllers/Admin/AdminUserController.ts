import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";


import { IGetAllUsersUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IGetAllUsersUsecase";
import { IGetUserByIdUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IGetUserByIdUsecase";
import { IUpdateUserStatusUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IUpdateUserStatusUsecase";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { MESSAGES } from "../../../shared/messages";

@injectable()
export class AdminUserController {
    constructor(
        @inject("IGetAllUsersUsecase") private _getAllUsersUsecase: IGetAllUsersUsecase,
        @inject("IGetUserByIdUsecase") private _getUserByIdUsecase: IGetUserByIdUsecase,
        @inject("IUpdateUserStatusUsecase") private _updateUserStatusUsecase: IUpdateUserStatusUsecase
    ) { }

    getAllUsers = async (req: Request, res: Response) => {
        try {
            const query = {
                page: req.query.page ? parseInt(req.query.page as string) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
                search: req.query.search as string,
                role: req.query.role as string,
                status: req.query.status as string,
                sortBy: req.query.sortBy as string,
                sortOrder: req.query.sortOrder as "asc" | "desc"
            };

            const result = await this._getAllUsersUsecase.getAllUsers(query)

            return res.status(HttpStatusCode.OK).json({
                success: true,
                ...result,
            })
        } catch (error: any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message || MESSAGES.USER_DATAS_FETCH_FAILED
            })
        }
    }


    getUserById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const user = await this._getUserByIdUsecase.getUserById(id as string)

            return res.status(HttpStatusCode.OK).json({
                success: true,
                user,
            })
        } catch (error: any) {
            const statusCode = error.name === 'NotFoundError' ? 404 : 400

            return res.status(statusCode).json({
                success: false,
                message: error.message || MESSAGES.USER_DATAS_FETCH_FAILED
            })

        }
    }


    toggleBlockStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!req.body) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: 'Request body is missing. Please provide isBlocked status.'
                });
            }

            const { isBlocked } = req.body

            if (typeof isBlocked !== 'boolean') {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: 'isBlocked must be boolean'
                })
            }

            await this._updateUserStatusUsecase.toggleBlockStatus(id as string, isBlocked)

            return res.status(HttpStatusCode.OK).json({
                success: true,
                message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
                data: {
                    userId: id,
                    isBlocked: isBlocked
                }
            })
        } catch (error: any) {
            const statusCode = error.name === "NotFoundError" ? 404 : 400;

            return res.status(statusCode).json({
                success: false,
                message: error.message || "Failed to update user block status",
            });
        }
    }


}
