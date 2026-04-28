import { Project } from "../../../../domain/entities/Project";

export interface IGetOpenProjectsUsecase {
    execute(userId?: string, page?: number, limit?: number): Promise<{ projects: Project[], total: number }>;
}
