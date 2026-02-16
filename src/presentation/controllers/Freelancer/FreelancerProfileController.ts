import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";

import { ICreateFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/ICreateFreelancerProfileUsecase";
import { IGetFreelancerUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IGetFreelancerProfileUsecase";
import { IRequestFreelancerVerificationUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IRequestVerificationUsecase";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { success } from "zod";
import { MESSAGES } from "../../../shared/messages";

@injectable()
export class FreelancerProfileController {
    constructor(
        @inject ("ICreateFreelancerProfileUsecase") private _createFreelancerProfileUsecase : ICreateFreelancerProfileUsecase,
        @inject ("IGetFreelancerUsecase") private _freelancerProfileUsecase : IGetFreelancerUsecase,
        @inject ("IRequestFreelancerVerificationUsecase") private _requestFreelancerVerifyUsecase : IRequestFreelancerVerificationUsecase
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
                data : freelancer
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
                    message : 'unauthorised'
                })
            }

            const userId = req.user.userId
            const freelancer = await this._freelancerProfileUsecase.execute(userId)

            return res.status(HttpStatusCode.OK).json({
                success : true,
                data : freelancer
            })
        } catch (error : any) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message
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
                data : freelancer
            })

        } catch (error: any) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
                success  : false,
                message : error.message
            })
        }
    }


}