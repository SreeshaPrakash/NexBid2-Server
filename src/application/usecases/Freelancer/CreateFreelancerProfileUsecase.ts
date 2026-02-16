import { injectable, inject } from "tsyringe";

import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { ICreateFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/ICreateFreelancerProfileUsecase";
import { Freelancer } from "../../../domain/entities/Freelancer";
import { CreateFreelancerProfileDTO } from "../../dto/freelancer.dto";
import { ValidationError } from "../../../shared/errorConstants";
import { FreelancerProfileStatus } from "../../../shared/FreelancerConstants/FreelancerProfileStatus";


@injectable()
export class CreateFreelancerProfileUsecase implements ICreateFreelancerProfileUsecase {
    constructor(
        @inject ("IFreelancerRepository") private freelancerRepo  : IFreelancerRepository
    ) {}

    async execute(userId: string, data: CreateFreelancerProfileDTO): Promise<Freelancer> {
        const existing = await this.freelancerRepo.findByUserId(userId)
        
        if(existing){
            throw new ValidationError("Freelancer profile already exists")
        }

        return this.freelancerRepo.create({
            userId,
            title : data.title,
            bio : data.bio,
            skills : data.skills,
            gitHubUrl : data.gitHubUrl ?? "",
            linkedinUrl: data.linkedinUrl ?? "",
            rating: 0,
            totalReview: 0,
            completedProjects: 0,
            status: FreelancerProfileStatus.Unverified,
            isActive: false,
            rejectionReason: "",
        } as Freelancer )
    }


}
