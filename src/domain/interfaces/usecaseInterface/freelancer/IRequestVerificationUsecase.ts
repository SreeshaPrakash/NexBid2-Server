
import { Freelancer } from "../../../entities/Freelancer";

export interface IRequestFreelancerVerificationUsecase {
    execute(userId : string) : Promise<Freelancer>
}