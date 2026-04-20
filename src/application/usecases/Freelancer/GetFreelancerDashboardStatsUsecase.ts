import { injectable, inject } from "tsyringe";
import { IGetFreelancerDashboardStatsUsecase } from "../../../domain/interfaces/usecaseInterface/freelancer/IGetFreelancerDashboardStatsUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { IFreelancerRepository } from "../../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { FreelancerDashboardStats } from "../../dto/dashboard.dto";

@injectable()
export class GetFreelancerDashboardStatsUsecase implements IGetFreelancerDashboardStatsUsecase {
    constructor(
        @inject("IProjectRepository") private _projectRepository: IProjectRepository,
        @inject("IBidRepository") private _bidRepository: IBidRepository,
        @inject("IFreelancerRepository") private _freelancerRepository: IFreelancerRepository
    ) { }

    async execute(userId: string): Promise<FreelancerDashboardStats> {

        const freelancer = await this._freelancerRepository.findByUserId(userId);

        const totalBidsPlaced = await this._bidRepository.countByFreelancer(freelancer?.id || "");

        let recommendedProjects: any[] = [];
        if (freelancer && freelancer.skills && freelancer.skills.length > 0) {
            recommendedProjects = await this._projectRepository.findRecommendedForFreelancer(freelancer.skills);
        } else {

            recommendedProjects = await this._projectRepository.findOpenProjects();

            recommendedProjects = recommendedProjects.slice(0, 5);
        }

        return {
            totalBidsPlaced,
            recommendedProjects
        };
    }
}
