
import { Freelancer } from "../../../entities/Freelancer";

export interface IGetFreelancerUsecase {
    execute(userId : string) : Promise< Freelancer | null >
}