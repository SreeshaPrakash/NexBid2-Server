import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IGetProjectByIdUsecase, GetProjectByIdInput } from "../../../domain/interfaces/usecaseInterface/project/IGetProjectByIdUsecase";
import { Project } from "../../../domain/entities/Project";
import { ProjectStatus, ProjectVisibility } from "../../../shared/projectConstants";
import { NotFoundError, ForbiddenError } from "../../../shared/errorConstants";

@injectable()
export class GetProjectByIdUsecase implements IGetProjectByIdUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(data: GetProjectByIdInput): Promise<Project> {
        const project = await this.projectRepo.findById(data.projectId);

        if (!project || project.isDeleted) {
            throw new NotFoundError("Project not found");
        }

        const { userId, userRole } = data;

        // Access Control Logic
        if (userRole === "client") {
            // Allow only if project.clientId matches userId
            if (project.clientId !== userId) {
                throw new ForbiddenError("no access to this project");
            }
        } else if (userRole === "freelancer") {
            const isPublicOpen = project.projectStatus === ProjectStatus.OPEN && project.visibility === ProjectVisibility.PUBLIC;
            const isSelectedFreelancer = project.selectedFreelancer === userId;

            if (!isPublicOpen && !isSelectedFreelancer) {
                throw new ForbiddenError("no access to this project");
            }
        }

        return project;
    }
}
