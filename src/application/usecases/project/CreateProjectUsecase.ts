import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { ICreateProjectUsecase } from "../../../domain/interfaces/usecaseInterface/project/ICreateProjectUsecase";
import { Project } from "../../../domain/entities/Project";
import { ProjectStatus, ProjectVisibility } from "../../../shared/projectConstants";
import { ClientProjectDTO } from "../../dto/project.dto";
import { ValidationError } from "../../../shared/errorConstants";

@injectable()
export class CreateProjectUsecase implements ICreateProjectUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(data: ClientProjectDTO): Promise<Project> {
        if (!data.clientId || !data.title || !data.description || data.budget === undefined) {
            throw new ValidationError("title, description, budget - Required fields missing.");
        }

        const biddingDeadline = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

        const projectData: Project = {
            id: "",
            clientId: data.clientId,
            title: data.title,
            description: data.description,
            budget: data.budget,
            attachments: data.attachments || [],
            skillsRequired: data.skillsRequired || [],
            projectStatus: ProjectStatus.OPEN,
            visibility: ProjectVisibility.PUBLIC,
            biddingDeadline,
            deadline: null,
            selectedFreelancer: null,
            isDeleted: false,
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return this.projectRepo.create(projectData);
    }
}
