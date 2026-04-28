import { injectable, inject } from "tsyringe";
import { IGetClientDashboardStatsUsecase } from "../../../domain/interfaces/usecaseInterface/Client/IGetClientDashboardStatsUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { ClientDashboardStats } from "../../dto/dashboard.dto";
import { ProjectStatus } from "../../../shared/projectConstants";

@injectable()
export class GetClientDashboardStatsUsecase implements IGetClientDashboardStatsUsecase {
    constructor(
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        @inject("IBidRepository") private _bidRepository: IBidRepository
    ) {}

    async execute(clientId: string): Promise<ClientDashboardStats> {
        const [activeProjectsCount, totalBidsCount, hiredTalentsCount, completedSpent, inProgressSpent] = await Promise.all([
            this._projectRepository.countActiveByClient(clientId),
            this._bidRepository.countTotalBidsForClientProjects(clientId),
            this._projectRepository.countByClientAndStatus(clientId, ProjectStatus.IN_PROGRESS),
            this._projectRepository.sumBudgetByClientAndStatus(clientId, ProjectStatus.COMPLETED),
            this._projectRepository.sumBudgetByClientAndStatus(clientId, ProjectStatus.IN_PROGRESS)
        ]);

        return {
            activeProjectsCount,
            totalBidsCount,
            hiredTalentsCount,
            totalSpent: completedSpent + inProgressSpent
        };
    }
}
