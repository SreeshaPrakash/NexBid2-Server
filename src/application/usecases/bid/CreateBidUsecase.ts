import { injectable, inject } from "tsyringe";
import { Bid } from "../../../domain/entities/Bid";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { ICreateBidUsecase } from "../../../domain/interfaces/usecaseInterface/bid/ICreateBidUsecase";
import { AppError } from "../../../shared/errorConstants";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { ProjectStatus } from "../../../shared/projectConstants";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { SocketService } from "../../services/SocketService";

@injectable()
export class CreateBidUsecase implements ICreateBidUsecase {
    constructor(
        @inject("IBidRepository") private _bidRepository: IBidRepository,
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        private _socketService: SocketService
    ) { }

    async execute(data: {
        projectId: string;
        freelancerId: string;
        bidAmount: number;
        deliveryTime: number;
        message: string;
    }): Promise<Bid> {

        // Check project status
        const project = await this._projectRepository.findById(data.projectId);

        const isExpired = project?.biddingDeadline ? new Date(project.biddingDeadline).getTime() < Date.now() : false;

        if (!project || project.projectStatus !== ProjectStatus.OPEN || isExpired) {
            throw new AppError("Cannot place bid. The project biddate is expired.", HttpStatusCode.BAD_REQUEST);
        }


        if (project.clientId.toString() === data.freelancerId) {
            throw new AppError("You cannot bid on your own project.", HttpStatusCode.BAD_REQUEST);
        }


        const existingBid = await this._bidRepository.findByFreelancerAndProject(data.freelancerId, data.projectId);
        if (existingBid && existingBid.status === 'active') {
            throw new AppError("You have already placed an active bid for this project.", HttpStatusCode.BAD_REQUEST);
        }

        const bidData: Bid = {
            id: "",
            ...data,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const createdBid = await this._bidRepository.create(bidData);

        this._socketService.emitNewBid(data.projectId, createdBid);

        return createdBid;
    }
}
