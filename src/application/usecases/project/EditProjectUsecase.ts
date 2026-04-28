import { injectable, inject } from "tsyringe";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { IEditProjectUsecase } from "../../../domain/interfaces/usecaseInterface/project/IEditProjectUsecase";
import { Project } from "../../../domain/entities/Project";
import { ProjectStatus } from "../../../shared/projectConstants";
import { ClientProjectDTO } from "../../dto/project.dto";
import { NotFoundError, ForbiddenError, ValidationError } from "../../../shared/errorConstants";

@injectable()
export class EditProjectUsecase implements IEditProjectUsecase {
    constructor(
        @inject("IProjectRepository") private projectRepo: IProjectRepository
    ) { }

    async execute(data: ClientProjectDTO): Promise<Project> {
        if (!data.projectId) {
            throw new ValidationError("Project ID is required for editing");
        }

        const project = await this.projectRepo.findById(data.projectId);
        
        if (!project) {
            throw new NotFoundError("Project not found");
        }

        // Rule: Only client who created project can edit
        if (project.clientId !== data.clientId) {
            throw new ForbiddenError("You are not authorized to edit this project");
        }

        // Rule: Cannot edit if status != OPEN
        if (project.projectStatus !== ProjectStatus.OPEN) {
            throw new ValidationError("Only projects with OPEN status can be edited");
        }

        const updateData: Partial<Project> = {};
        
        // If it's a specific extension request
        if ((data as any).isExtension) {
            const currentDeadline = new Date(project.biddingDeadline);
            updateData.biddingDeadline = new Date(currentDeadline.getTime() + 5 * 24 * 60 * 60 * 1000);
        } else {
            if (data.title !== undefined) updateData.title = data.title;
            if (data.description !== undefined) updateData.description = data.description;
            if (data.budget !== undefined) updateData.budget = data.budget;
            if (data.attachments !== undefined) updateData.attachments = data.attachments;
            if (data.skillsRequired !== undefined) updateData.skillsRequired = data.skillsRequired;
            if (data.biddingDeadline !== undefined) updateData.biddingDeadline = new Date(data.biddingDeadline);
            if (data.deadline !== undefined) updateData.deadline = data.deadline ? new Date(data.deadline) : null;
            if (data.visibility !== undefined) updateData.visibility = data.visibility;
        }

        const updatedProject = await this.projectRepo.update(data.projectId, updateData);
        return updatedProject!;
    }
}
