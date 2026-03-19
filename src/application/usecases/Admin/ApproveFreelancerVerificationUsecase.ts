import { injectable, inject } from 'tsyringe';

import { IFreelancerRepository } from './../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository';
import { IApproveFreelancerVerificationUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IApproveFreelancerVerificationUsecase";
import { ValidationError } from '../../../shared/errorConstants';
import { FreelancerProfileStatus } from '../../../shared/FreelancerConstants/FreelancerProfileStatus';

@injectable()
export class ApproveFreelancerVerificationUsecase implements IApproveFreelancerVerificationUsecase {
    constructor(
        @inject("IFreelancerRepository") private _freelancerRepo : IFreelancerRepository
    ) {}

    async execute(freelancerId: string): Promise<void> {
        const freelancer = await this._freelancerRepo.findById(freelancerId)
        if(!freelancer){
            throw new ValidationError('Freelancer not found')
        }

        await this._freelancerRepo.update(freelancerId, {
            verificationStatus : FreelancerProfileStatus.Verified,
            rejectionReason : ""
        })
    }
}