import { injectable, inject } from "tsyringe";
import { IGetFreelancerDashboardStatsUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IGetFreelancerDashboardStatsUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { FreelancerDashboardStats } from "../../dto/dashboard.dto";
import { ProjectStatus } from "../../../shared/projectConstants";

@injectable()
export class GetFreelancerDashboardStatsUsecase implements IGetFreelancerDashboardStatsUsecase {
    constructor(
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        @inject("IBidRepository") private _bidRepository: IBidRepository,
        @inject("IFreelancerRepository") private _freelancerRepository: IFreelancerRepository
    ) { }

    async execute(userId: string): Promise<FreelancerDashboardStats> {

        const freelancer = await this._freelancerRepository.findByUserId(userId);
        const freelancerId = freelancer?.id || "";

        const [totalBidsPlaced, ongoingProjectsCount, completedProjectsCount, totalEarnings] = await Promise.all([
            this._bidRepository.countByFreelancer(freelancerId),
            this._projectRepository.countByFreelancerAndStatus(freelancerId, ProjectStatus.IN_PROGRESS),
            this._projectRepository.countByFreelancerAndStatus(freelancerId, ProjectStatus.COMPLETED),
            this._projectRepository.sumBudgetByFreelancerAndStatus(freelancerId, ProjectStatus.COMPLETED)
        ]);

        let recommendedProjects: any[] = [];
        if (freelancer && freelancer.skills && freelancer.skills.length > 0) {
            recommendedProjects = await this._projectRepository.findRecommendedForFreelancer(freelancer.skills, userId);
        } else {
            const result = await this._projectRepository.findOpenProjects(userId, 1, 5);
            recommendedProjects = result.projects;
        }

        return {
            totalBidsPlaced,
            ongoingProjectsCount,
            completedProjectsCount,
            totalEarnings,
            recommendedProjects
        };
    }
}


