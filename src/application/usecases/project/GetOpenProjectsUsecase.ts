import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IGetOpenProjectsUsecase } from "../../../domain/interfaces/usecaseInterface/project/IGetOpenProjectsUsecase";
import { Project } from "../../../domain/entities/Project";

@injectable()
export class GetOpenProjectsUsecase implements IGetOpenProjectsUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(): Promise<Project[]> {
        return this.projectRepo.findOpenProjects();
    }
}
