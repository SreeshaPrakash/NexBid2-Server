import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IGetClientProjectsUsecase } from "../../../domain/interfaces/usecaseInterface/project/IGetClientProjectsUsecase";
import { ProjectStatus } from "../../../shared/projectConstants";
import { Project } from "../../../domain/entities/Project";
import { ValidationError } from "../../../shared/errorConstants";

@injectable()
export class GetClientProjectsUsecase implements IGetClientProjectsUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(clientId: string, page: number = 1, limit: number = 10, status?: ProjectStatus): Promise<{ projects: Project[], total: number }> {
        if (!clientId) {
            throw new ValidationError("Client ID is required");
        }

        return await this.projectRepo.findByClient(clientId, page, limit, status);
    }
}
