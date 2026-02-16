import { injectable, inject } from "tsyringe";


import { Freelancer } from "../../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { IGetFreelancerUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IGetFreelancerProfileUsecase";

@injectable()
export class FreelancerProfileUsecase implements IGetFreelancerUsecase {

    constructor(
        @inject ("IFreelancerRepository") private _freelancerRepo : IFreelancerRepository
    ) { }

    async execute(userId: string): Promise<Freelancer | null> {
        return this._freelancerRepo.findByUserId(userId)
    }
}