import { injectable, inject } from "tsyringe";
import { Bid } from "../../../domain/entities/Bid";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { IGetBidByFreelancerUsecase } from "../../../domain/interfaces/usecaseInterface/bid/IGetBidByFreelancerUsecase";

@injectable()
export class GetBidByFreelancerUsecase implements IGetBidByFreelancerUsecase {
    constructor(
        @inject("IBidRepository") private _bidRepository: IBidRepository
    ) {}

    async execute(data: { projectId: string; freelancerId: string }): Promise<Bid | null> {
        return await this._bidRepository.findByFreelancerAndProject(data.freelancerId, data.projectId);
    }
}
