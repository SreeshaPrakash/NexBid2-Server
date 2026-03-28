import { injectable, inject } from "tsyringe";
import { Bid } from "../../../domain/entities/Bid";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { IUpdateBidUsecase } from "../../../domain/interfaces/usecaseInterface/bid/IUpdateBidUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { AppError } from "../../../shared/errorConstants";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { ProjectStatus } from "../../../shared/projectConstants";
import { UpdateBidDTO } from "../../dto/bid.dto";
import { SocketService } from "../../services/SocketService";

@injectable()
export class UpdateBidUsecase implements IUpdateBidUsecase {
    constructor(
        @inject("IBidRepository") private _bidRepository: IBidRepository,
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        private _socketService: SocketService
    ) { }

    async execute(data: UpdateBidDTO): Promise<Bid> {
        const bid = await this._bidRepository.findById(data.bidId);
        if (!bid) {
            throw new AppError("Bid not found.", HttpStatusCode.NOT_FOUND);
        }

        if (bid.freelancerId !== data.freelancerId) {
            throw new AppError("You are not authorized to update this bid.", HttpStatusCode.FORBIDDEN);
        }

        // if (bid.status !== 'active') {
        //     throw new AppError(`Cannot update a bid that is already ${bid.status}.`, HttpStatusCode.BAD_REQUEST);
        // }

        const project = await this._projectRepository.findById(bid.projectId);

        // const isExpired = project?.biddingDeadline ? new Date(project.biddingDeadline).getTime() < Date.now() : false;

        // if (!project || project.projectStatus  || isExpired) {
        //     throw new AppError("Cannot update bid. The project biddate is expired.", HttpStatusCode.BAD_REQUEST);
        // }

        const updateData: Partial<Bid> = {
            updatedAt: new Date()
        };

        if (data.bidAmount !== undefined) updateData.bidAmount = data.bidAmount;
        if (data.deliveryTime !== undefined) updateData.deliveryTime = data.deliveryTime;
        if (data.message !== undefined) updateData.message = data.message;

        const updatedBid = await this._bidRepository.update(data.bidId, updateData);

        // Emit socket event
        this._socketService.emitBidUpdate(bid.projectId, updatedBid);

        return updatedBid;
    }
}
