import { FreelancerMapper } from '../../../application/mappers/FreelanceMapper';
import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";

import { ICreateFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/ICreateFreelancerProfileUsecase";
import { IGetFreelancerUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IGetFreelancerProfileUsecase";
import { IRequestFreelancerVerificationUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IRequestVerificationUsecase";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { MESSAGES } from "../../../shared/messages";
import { IUpdateFreelancerProfileUsecase } from '../../../domain/interfaces/usecaseInterface/freelancer/IUpdateFreelancerProfileUsecase';
import { IGetFreelancerDashboardStatsUsecase } from '../../../domain/interfaces/usecaseInterface/freelancer/IGetFreelancerDashboardStatsUsecase';

@injectable()
export class FreelancerProfileController {
    constructor(
        @inject ("ICreateFreelancerProfileUsecase") private _createFreelancerProfileUsecase : ICreateFreelancerProfileUsecase,
        @inject ("IGetFreelancerUsecase") private _freelancerProfileUsecase : IGetFreelancerUsecase,
        @inject ("IRequestFreelancerVerificationUsecase") private _requestFreelancerVerifyUsecase : IRequestFreelancerVerificationUsecase,
        @inject ("IUpdateFreelancerProfileUsecase") private _updateFreelancerProfileUsecase : IUpdateFreelancerProfileUsecase,
        @inject ("IGetFreelancerDashboardStatsUsecase") private _getFreelancerDashboardStatsUsecase : IGetFreelancerDashboardStatsUsecase
    ) {}

    createProfile = async(req: Request, res: Response) => {
        try {

            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : "unauthorised"
                })
            }

            const userId = req.user.userId
            const freelancer = await this._createFreelancerProfileUsecase.execute( userId, req.body) 
            
            return res.status(HttpStatusCode.CREATED).json({
                success : true,
                data : FreelancerMapper.toDto(freelancer)
            })
        } catch (error : any) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success : false,
                message : error.message
            })
        }
    }


    getProfile = async(req : Request, res : Response) => {
        try {
            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : MESSAGES.RESOURCE_NOT_FOUND
                })
            }

            const userId = req.user.userId
            const freelancer = await this._freelancerProfileUsecase.execute(userId)

            return res.status(HttpStatusCode.OK).json({
                success : true,
                data : freelancer ? FreelancerMapper.toDto(freelancer) : null
            })
        } catch (error : any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message
            })
        }
    }



    UpdateFreelancerProfile = async(req:Request, res : Response) => {
        try {
            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : MESSAGES.RESOURCE_NOT_FOUND
                })
            }

            const userId = req.user.userId
            const data = req.body
            const updatedFreelancer = await this._updateFreelancerProfileUsecase.execute( userId , data)


            return res.status(HttpStatusCode.OK).json({
                success : true,
                message : MESSAGES.PROFILE_UPDATE_SUCCESS,
                data : FreelancerMapper.toDto(updatedFreelancer)
            })


        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.INTERNAL_SERVER_ERROR
            })
        }
    }


    

    requestVerification = async(req: Request, res : Response) => {
        try {
            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : "unauthorised"
                })
            }

            const userId = req.user.userId
            const freelancer = await this._requestFreelancerVerifyUsecase.execute(userId)

            return res.status(HttpStatusCode.OK).json({
                success : true,
                message : "Verification request submitted",
                data : FreelancerMapper.toDto(freelancer)
            })

        } catch (error: any) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success  : false,
                message : error.message
            })
        }
    }


    getDashboardStats = async(req: Request, res: Response) => {
        try {
            if(!req.user){
                return res.status(HttpStatusCode.UNAUTHORIZED).json({
                    success : false,
                    message : MESSAGES.RESOURCE_NOT_FOUND
                })
            }

            const userId = req.user.userId
            const stats = await this._getFreelancerDashboardStatsUsecase.execute(userId)

            return res.status(HttpStatusCode.OK).json({
                success : true,
                data : stats
            })
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.INTERNAL_SERVER_ERROR
            })
        }
    }


}
