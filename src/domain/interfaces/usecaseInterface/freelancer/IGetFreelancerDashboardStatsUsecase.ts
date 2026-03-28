import { Project } from "../../../entities/Project";
import { FreelancerDashboardStats } from "../../../../application/dto/dashboard.dto";

export interface IGetFreelancerDashboardStatsUsecase {
    execute(userId: string): Promise<FreelancerDashboardStats>;
}
