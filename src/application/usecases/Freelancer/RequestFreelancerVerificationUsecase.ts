import { injectable, inject } from "tsyringe";
import { Freelancer } from "../../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { IRequestFreelancerVerificationUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IRequestVerificationUsecase";
import { ValidationError } from "../../../shared/errorConstants";
import { FreelancerProfileStatus } from "../../../shared/FreelancerConstants/FreelancerProfileStatus";

@injectable()
export class RequestFreelancerVerificationUsecase implements IRequestFreelancerVerificationUsecase {
    constructor(
        @inject ("IFreelancerRepository") private _freelancerRepo : IFreelancerRepository
    ) { }

    async execute(userId: string): Promise<Freelancer> {
        const freelancer = await this._freelancerRepo.findByUserId(userId)

        if(!freelancer){
            throw new ValidationError( 'Freelancer profile not found, please create first')
        }

        if(freelancer.verificationStatus === FreelancerProfileStatus.Verified){
            throw new ValidationError("Profile already verified")
        }

        if(freelancer.verificationStatus === FreelancerProfileStatus.Pending) {
            throw new ValidationError('Verification request already pending')
        }

        if(
            freelancer.verificationStatus === FreelancerProfileStatus.Rejected || 
            freelancer.verificationStatus === FreelancerProfileStatus.Unverified
        ) {
            const updated = await this._freelancerRepo.update(freelancer.id, {
                verificationStatus : FreelancerProfileStatus.Pending,
                rejectionReason : "",
            })

            if(!updated){
                throw new ValidationError('Failed to submit verification request')
            }

            return updated
        }
        throw new ValidationError('Invalid Verification state')
    }
}