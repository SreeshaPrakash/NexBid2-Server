import { injectable, inject } from "tsyringe";

import { IClientProfileUsecase } from "../../../domain/interfaces/usecaseInterface/Client/IClientProfileUsecase";
import { Request, Response } from "express";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { MESSAGES } from "../../../shared/messages";
import { IUpdateClientProfileUsecase } from "../../../domain/interfaces/usecaseInterface/Client/IClientUpdateProfileUsecase";
import { mapUserToDto } from "../../../application/mappers/UserMapper";



@injectable()
export class ClientProfileController {
    constructor(
        @inject('IClientProfileUsecase') private _clientProfileUsecase : IClientProfileUsecase,
        @inject('IUpdateClientProfileUsecase') private _updateClientProfileUsecase : IUpdateClientProfileUsecase
    ) {}


     getClientProfile = async(req: Request, res: Response)=>{
        try {
            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : MESSAGES.RESOURCE_NOT_FOUND
                })
            }

            const userId = req.user.userId
            const client = await this._clientProfileUsecase.getClientProfile(userId)

            return res.status(HttpStatusCode.OK).json({
                success : true,
                data : client ? mapUserToDto(client) : null

            })

        } catch (error : any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.USER_NOT_FOUND
            })
        }
    }



    updateClientProfile = async(req: Request, res: Response)=>{
        try {
            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : MESSAGES.RESOURCE_NOT_FOUND
                })
            }

            const userId = req.user.userId
            const data = req.body
            const updatedClient = await this._updateClientProfileUsecase.execute(userId, data)

            return res.status(HttpStatusCode.OK).json({
                success : true,
                message : MESSAGES.PROFILE_UPDATE_SUCCESS,
                data : updatedClient ? mapUserToDto(updatedClient) : null

            })


        } catch (error : any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.INTERNAL_SERVER_ERROR
            })
        }
    }



    




}