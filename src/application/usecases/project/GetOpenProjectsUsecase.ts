import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IGetOpenProjectsUsecase } from "../../../domain/interfaces/usecaseInterface/project/IGetOpenProjectsUsecase";
import { Project } from "../../../domain/entities/Project";

@injectable()
export class GetOpenProjectsUsecase implements IGetOpenProjectsUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(userId?: string, page: number = 1, limit: number = 10): Promise<{ projects: Project[], total: number }> {
        return this.projectRepo.findOpenProjects(userId, page, limit);
    }
}
