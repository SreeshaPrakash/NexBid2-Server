import { Project } from "../../../entities/Project";

export interface IProjectRepository {
    create(project: Project): Promise<Project>;

    findById(projectId: string): Promise<Project | null>;

    findByClient(clientId: string, page?: number, limit?: number, status?: string): Promise<{ projects: Project[], total: number }>;

    findOpenProjects(excludeClientId?: string, page?: number, limit?: number): Promise<{ projects: Project[], total: number }>;

    update(projectId: string, data: Partial<Project>): Promise<Project>;

    delete(projectId: string): Promise<void>;

    countActiveByClient(clientId: string): Promise<number>;

    findRecommendedForFreelancer(skills: string[], excludeClientId?: string): Promise<Project[]>;

    countByClientAndStatus(clientId: string, status: string): Promise<number>;

    sumBudgetByClientAndStatus(clientId: string, status: string): Promise<number>;

    countByFreelancerAndStatus(freelancerId: string, status: string): Promise<number>;

    sumBudgetByFreelancerAndStatus(freelancerId: string, status: string): Promise<number>;
}
