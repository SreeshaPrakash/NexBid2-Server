import { injectable, inject } from "tsyringe";


import { Freelancer } from "../../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { IUpdateFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IUpdateFreelancerProfileUsecase";
import { ValidationError } from "../../../shared/errorConstants";
import { MESSAGES } from "../../../shared/messages";
import { UpdateFreelancerProfileDTO } from "../../dto/freelancer.dto";

@injectable()
export class UpdateFreelancerProfileUsecase implements IUpdateFreelancerProfileUsecase {

    constructor(
        @inject ("IFreelancerRepository") private _freelancerRepo : IFreelancerRepository
    ) { }

    async execute(freelancerId: string, data: UpdateFreelancerProfileDTO): Promise<Freelancer> {
        const updated = await this._freelancerRepo.update(
            freelancerId, data
        );

        if(!updated) {
            throw new ValidationError(MESSAGES.UPDATE_PROFILE_FAILED)
        }

        return updated

    }
}