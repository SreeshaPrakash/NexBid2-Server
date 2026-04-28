import { injectable, inject } from "tsyringe";
import { Bid } from "../../../domain/entities/Bid";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { IWithdrawBidUsecase } from "../../../domain/interfaces/usecaseInterface/bid/IWithdrawBidUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { AppError } from "../../../shared/errorConstants";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { ProjectStatus } from "../../../shared/projectConstants";
import { SocketService } from "../../services/SocketService";

@injectable()
export class WithdrawBidUsecase implements IWithdrawBidUsecase {
    constructor(
        @inject("IBidRepository") private _bidRepository: IBidRepository,
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        private _socketService: SocketService
    ) { }

    async execute(data: {
        bidId: string;
        freelancerId: string;
    }): Promise<Bid> {
        const bid = await this._bidRepository.findById(data.bidId);
        if (!bid) {
            throw new AppError("Bid not found.", HttpStatusCode.NOT_FOUND);
        }

        if (bid.freelancerId !== data.freelancerId) {
            throw new AppError("You are not authorized to withdraw this bid.", HttpStatusCode.FORBIDDEN);
        }

        if (bid.status !== 'active') {
            throw new AppError(`Cannot withdraw a bid that is already ${bid.status}.`, HttpStatusCode.BAD_REQUEST);
        }

        const project = await this._projectRepository.findById(bid.projectId);

        const isExpired = project?.biddingDeadline ? new Date(project.biddingDeadline).getTime() < Date.now() : false;

        if (!project || project.projectStatus !== ProjectStatus.OPEN || isExpired) {
            throw new AppError("Cannot withdraw bid. The project biddate is expired.", HttpStatusCode.BAD_REQUEST);
        }

        const updatedBid = await this._bidRepository.update(data.bidId, {
            status: 'withdrawn',
            updatedAt: new Date()
        });

        // Emit socket event
        this._socketService.emitBidUpdate(bid.projectId, updatedBid);

        return updatedBid;
    }
}
