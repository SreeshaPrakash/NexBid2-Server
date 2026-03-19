import { injectable, inject } from 'tsyringe';
import { IGetPendingVerificationsUsecase } from '../../../domain/interfaces/usecaseInterface/admin/IGetPendingVerificationsUsecase';
import { IFreelancerRepository } from '../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository';
import { Freelancer } from '../../../domain/entities/Freelancer';

@injectable()
export class GetPendingVerificationsUsecase implements IGetPendingVerificationsUsecase {
     constructor(
        @inject("IFreelancerRepository") private _freelancerRepo : IFreelancerRepository
     ) {}

     async execute(): Promise<Freelancer[]> {
         return await this._freelancerRepo.findPendingVerifications()
     }
}

