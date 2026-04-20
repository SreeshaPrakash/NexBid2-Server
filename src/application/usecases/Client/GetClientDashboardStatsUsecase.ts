import { injectable, inject } from "tsyringe";
import { IGetClientDashboardStatsUsecase } from "../../../domain/interfaces/usecaseInterface/Client/IGetClientDashboardStatsUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { ClientDashboardStats } from "../../dto/dashboard.dto";

@injectable()
export class GetClientDashboardStatsUsecase implements IGetClientDashboardStatsUsecase {
    constructor(
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        @inject("IBidRepository") private _bidRepository: IBidRepository
    ) {}

    async execute(clientId: string): Promise<ClientDashboardStats> {
        const activeProjectsCount = await this._projectRepository.countActiveByClient(clientId);
        const totalBidsCount = await this._bidRepository.countTotalBidsForClientProjects(clientId);

        return {
            activeProjectsCount,
            totalBidsCount
        };
    }
}
