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

    async execute(clientId: string, status?: ProjectStatus): Promise<Project[]> {
        if (!clientId) {
            throw new ValidationError("Client ID is required");
        }

        let projects = await this.projectRepo.findByClient(clientId);

        if (status) {
            projects = projects.filter(project => project.projectStatus === status);
        }

        return projects;
    }
}
