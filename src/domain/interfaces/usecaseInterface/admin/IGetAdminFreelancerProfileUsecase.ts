import { Freelancer } from "../../../entities/Freelancer";

export interface IGetAdminFreelancerProfileUsecase {
    execute(id: string): Promise<Freelancer | null >
}

