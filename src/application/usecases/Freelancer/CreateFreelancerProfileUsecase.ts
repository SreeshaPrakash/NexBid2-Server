import { injectable, inject } from "tsyringe";

import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { ICreateFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/ICreateFreelancerProfileUsecase";
import { Freelancer } from "../../../domain/entities/Freelancer";
import { CreateFreelancerProfileDTO } from "../../dto/freelancer.dto";
import { ValidationError } from "../../../shared/errorConstants";
import { FreelancerProfileStatus } from "../../../shared/FreelancerConstants/FreelancerProfileStatus";


@injectable()
export class CreateFreelancerProfileUsecase implements ICreateFreelancerProfileUsecase {
    constructor(
        @inject("IFreelancerRepository") private freelancerRepo: IFreelancerRepository,
        @inject("IUserRepository") private userRepo: IUserRepository
    ) { }

    async execute(userId: string, data: CreateFreelancerProfileDTO): Promise<Freelancer> {
        const existing = await this.freelancerRepo.findByUserId(userId)

        if (existing) {
            throw new ValidationError("Freelancer profile already exists")
        }

        const userUpdateData: any = {};
        if (data.name !== undefined) userUpdateData.name = data.name;
        if (data.phone !== undefined) userUpdateData.phone = data.phone;
        if (data.country !== undefined) userUpdateData.country = data.country;
        if (data.state !== undefined) userUpdateData.state = data.state;

        if (data.profileImage !== undefined) userUpdateData.profileImage = data.profileImage;


        const user = await this.userRepo.findById(userId);

        const currentRoles = user?.roles ?? ['client'];
        if (!currentRoles.includes('freelancer' as any)) {
            userUpdateData.roles = [...currentRoles, 'freelancer'];
        }

        if (Object.keys(userUpdateData).length > 0) {
            await this.userRepo.update(userId, userUpdateData);
        }

        return this.freelancerRepo.create({
            userId,
            title: data.title,
            bio: data.bio,
            skills: data.skills,
            experienceInYears: data.experienceInYears,
            hourlyRate: data.hourlyRate,
            portfolio: data.portfolio ?? "",
            previousWorks: data.previousWorks ?? [],
            gitHubUrl: data.gitHubUrl ?? "",
            linkedinUrl: data.linkedinUrl ?? "",
            phone: data.phone,
            name: data.name,
            email: data.email,
            country: data.country,
            state: data.state,
            profileImage: data.profileImage ?? "",
            rating: 0,
            totalReviews: 0,
            completedProjects: 0,
            verificationStatus: FreelancerProfileStatus.Unverified,
            isActive: false,
            rejectionReason: "",
        } as Freelancer)
    }

}




