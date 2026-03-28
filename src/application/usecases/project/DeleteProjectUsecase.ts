import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IDeleteProjectUsecase, DeleteProjectInput } from "../../../domain/interfaces/usecaseInterface/project/IDeleteProjectUsecase";
import { Project } from "../../../domain/entities/Project";
import { ProjectStatus } from "../../../shared/projectConstants";
import { NotFoundError, ForbiddenError, ValidationError } from "../../../shared/errorConstants";

@injectable()
export class DeleteProjectUsecase implements IDeleteProjectUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(data: DeleteProjectInput): Promise<Project> {
        const project = await this.projectRepo.findById(data.projectId);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        if (project.clientId !== data.clientId) {
            throw new ForbiddenError("no access to this project");
        }

        if (project.projectStatus !== ProjectStatus.OPEN) {
            throw new ValidationError("Only open projects can be deleted");
        }

        const updateData: Partial<Project> = {
            isDeleted: true,
            deletedAt: new Date(),
            projectStatus: ProjectStatus.CANCELLED
        };

        return this.projectRepo.update(data.projectId, updateData);
    }
}
