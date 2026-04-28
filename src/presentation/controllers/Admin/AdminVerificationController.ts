import { MESSAGES } from './../../../shared/messages';
import { IRejectFreelancerVerificationUsecase } from './../../../domain/interfaces/usecaseInterface/admin/IRejectFreelancerVerificationUsecase';
import { inject, injectable } from 'tsyringe';
import { IGetPendingVerificationsUsecase } from '../../../domain/interfaces/usecaseInterface/admin/IGetPendingVerificationsUsecase';
import { IApproveFreelancerVerificationUsecase } from '../../../domain/interfaces/usecaseInterface/admin/IApproveFreelancerVerificationUsecase';
import { IGetAdminFreelancerProfileUsecase } from '../../../domain/interfaces/usecaseInterface/admin/IGetAdminFreelancerProfileUsecase';
import { HttpStatusCode } from '../../../shared/httpStatusCode';
import { Request, Response } from 'express';


@injectable()
export class AdminVerificationController {
    constructor (
        @inject("IGetPendingVerificationsUsecase") private _getPendingVerificationsUsecase : IGetPendingVerificationsUsecase,
        @inject("IApproveFreelancerVerificationUsecase") private _approveFreelancerVerificationUsecase : IApproveFreelancerVerificationUsecase,
        @inject("IRejectFreelancerVerificationUsecase") private _rejectFreelancerVerificationUsecase : IRejectFreelancerVerificationUsecase,
        @inject("IGetAdminFreelancerProfileUsecase") private _getAdminFreelancerProfileUsecase : IGetAdminFreelancerProfileUsecase
    ) {}

    getFreelancerProfile = async (req: Request, res: Response)=>{
        try {
            const {id} = req.params;
            const freelancer = await this._getAdminFreelancerProfileUsecase.execute(id as string)
            if(!freelancer){
                return res.status(HttpStatusCode.NOT_FOUND).json({
                    success : false,
                    message : "Freelancer profile not found"
                })
            }
            res.status(HttpStatusCode.OK).json({
                success : true,
                message : "Freelancer profile got sucess",
                data : freelancer
            })
        } catch (error: any) {
            res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.INTERNAL_SERVER_ERROR
            
            })
        }
    }

    getPendingRequests = async (req: Request, res : Response) => {
        try {
            const result = await this._getPendingVerificationsUsecase.execute();
            res.status(HttpStatusCode.OK).json({
                success : true,
                message : "Pending verification requests success",
                data : result
            })
        } catch (error: any) {
            res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || 'internal server error'
            })
        }
    }

    approveVerification = async (req : Request, res : Response)=>{
        try {
            const freelancerId = req.params.freelancerId as string
            await this._approveFreelancerVerificationUsecase.execute(freelancerId)
            res.status(HttpStatusCode.OK).json({
                success : true,
                message : "Freelancer verification success"
            })
        } catch (error : any) {
            res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.INTERNAL_SERVER_ERROR
            })
        }
    }

    rejectVerification = async(req: Request, res: Response) =>{
        try {
            const freelancerId = req.params.freelancerId as string
            const {reason} = req.body
            await this._rejectFreelancerVerificationUsecase.execute(freelancerId, reason)
            res.status(HttpStatusCode.OK).json({
                success : true,
                message : 'freelancer verification rejected'
            }) 
        } catch (error: any) {
            res.status(error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                success : false,
                message : error.message || MESSAGES.INTERNAL_SERVER_ERROR
            })
        }
    }



}