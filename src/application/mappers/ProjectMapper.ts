import { Project } from "../../domain/entities/Project";
import { ProjectDto, ProjectListDto } from "../dto/project.dto";




export class ProjectMapper {
    public static toDto(project: Project): ProjectDto {
        return {
            id: project.id,
            clientId: project.clientId,
            title: project.title,
            description: project.description,
            budget: project.budget,
            deadline: project.deadline,
            biddingDeadline: project.biddingDeadline,
            attachments: project.attachments || [],
            skillsRequired: project.skillsRequired || [],
            projectStatus: project.projectStatus,
            visibility: project.visibility,
            selectedFreelancer: project.selectedFreelancer,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
        };
    }

    public static toListItem(project: Project): ProjectListDto {
        return {
            id: project.id,
            clientId: project.clientId,
            title: project.title,
            budget: project.budget,
            projectStatus: project.projectStatus,
            visibility: project.visibility,
            biddingDeadline: project.biddingDeadline,
            createdAt: project.createdAt
        };
    }

    public static toProjectList(projects: Project[]): ProjectListDto[] {
        return projects.map(project => this.toListItem(project));
    }


}


