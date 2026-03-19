import { injectable, inject } from 'tsyringe';

import { IGetAdminFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IGetAdminFreelancerProfileUsecase";
import { IFreelancerRepository } from '../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository';
import { Freelancer } from '../../../domain/entities/Freelancer';

@injectable()
export class GetAdminFreelancerProfileUsecase implements IGetAdminFreelancerProfileUsecase {
    constructor(
        @inject ("IFreelancerRepository")  private _freelancerRepo : IFreelancerRepository
    ) {}

    async execute(id: string): Promise<Freelancer | null> {
        let freelancer = await this._freelancerRepo.findById(id)

        if(!freelancer){
            freelancer  = await this._freelancerRepo.findByUserId(id)
        }
        return freelancer
    }
}