import { inject, injectable } from 'tsyringe';
import { IRejectFreelancerVerificationUsecase } from '../../../domain/interfaces/usecaseInterface/admin/IRejectFreelancerVerificationUsecase';
import { IFreelancerRepository } from '../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository';
import { ValidationError } from '../../../shared/errorConstants';
import { FreelancerProfileStatus } from '../../../shared/FreelancerConstants/FreelancerProfileStatus';

@injectable()
export class RejectFreelancerVerificationUsecase implements IRejectFreelancerVerificationUsecase {
    constructor ( 
        @inject ("IFreelancerRepository") private _freelancerRepo : IFreelancerRepository
    ) {}

    async execute(freelancerId: string, reason: string): Promise<void> {
        const freelancer = await this._freelancerRepo.findById(freelancerId)
        if(!freelancer){
            throw new ValidationError('Freelancer not found')
        }

        await this._freelancerRepo.update(freelancerId, {
            verificationStatus : FreelancerProfileStatus.Rejected,
            rejectionReason : reason
        })
    }
}