import { UpdateFreelancerProfileDTO } from "../../../../application/dto/freelancer.dto";
import { Freelancer } from "../../../entities/Freelancer";

export interface IUpdateFreelancerProfileUsecase {
    execute (freelancerId : string,data: UpdateFreelancerProfileDTO ) : Promise<Freelancer>
}