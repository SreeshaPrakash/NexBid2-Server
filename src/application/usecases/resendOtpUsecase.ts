
import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IOtpService } from "../../domain/interfaces/serviceInterface/otpServiceInterface";
import { IResendOtpusecase } from "../../domain/interfaces/usecaseInterface/user/IResendOtpUsecase";
import { ConflictError } from "../../shared/errorConstants";


export class ResendOtpUsecase implements IResendOtpusecase {
       

    constructor(
        private _userRepo : IUserRepository,
        private _otpService : IOtpService
    ) {}

        async execute(email: string): Promise<boolean> {
            
            if(!email){
                throw new Error('email required')
            }

            const existingUser = this._userRepo.findByEmail(email)
            if(!existingUser){
                throw new ConflictError(`email already verified, login instead`)
            }

            await this._otpService.resendOtp(email)
            return true
        }
}