import { Bid } from "../../../entities/Bid";

export interface IGetBidByFreelancerUsecase {
    execute(data: { projectId: string; freelancerId: string }): Promise<Bid | null>;
}
