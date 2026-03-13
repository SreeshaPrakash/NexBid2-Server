import { injectable, inject } from "tsyringe";


import { Freelancer } from "../../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IUpdateFreelancerProfileUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IUpdateFreelancerProfileUsecase";
import { ValidationError } from "../../../shared/errorConstants";
import { MESSAGES } from "../../../shared/messages";
import { UpdateFreelancerProfileDTO } from "../../dto/freelancer.dto";

@injectable()
export class UpdateFreelancerProfileUsecase implements IUpdateFreelancerProfileUsecase {

    constructor(
        @inject("IFreelancerRepository") private _freelancerRepo: IFreelancerRepository,
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }

    async execute(userId: string, data: UpdateFreelancerProfileDTO): Promise<Freelancer> {
        const freelancer = await this._freelancerRepo.findByUserId(userId)

        if (!freelancer) {
            throw new ValidationError("Freelancer profile not found")
        }

        const userUpdateData: any = {};
        if (data.name !== undefined) userUpdateData.name = data.name;
        if (data.phone !== undefined) userUpdateData.phone = data.phone;
        if (data.country !== undefined) userUpdateData.country = data.country;
        if (data.state !== undefined) userUpdateData.state = data.state;

        if (data.profileImage !== undefined) userUpdateData.profileImage = data.profileImage;


        if (Object.keys(userUpdateData).length > 0) {
            await this._userRepo.update(userId, userUpdateData);
        }

        const updated = await this._freelancerRepo.update(freelancer.id!, data);

        if (!updated) {
            throw new ValidationError(MESSAGES.PROFILE_UPDATE_FAILED)
        }

        return updated

    }
}


