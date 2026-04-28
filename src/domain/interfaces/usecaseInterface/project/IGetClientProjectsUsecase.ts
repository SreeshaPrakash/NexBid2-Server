import { Project } from "../../../../domain/entities/Project";
import { ProjectStatus } from "../../../../shared/projectConstants";

export interface IGetClientProjectsUsecase {
    execute(clientId: string, page?: number, limit?: number, status?: ProjectStatus): Promise<{ projects: Project[], total: number }>;
}
