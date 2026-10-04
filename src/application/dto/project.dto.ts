import { ProjectStatus, ProjectVisibility } from "../../shared/projectConstants";

// for both create and edit
export interface ClientProjectDTO {
    projectId?: string;
    clientId: string;
    title?: string;
    description?: string;
    budget?: number;
    deadline?: string | Date | null;
    biddingDeadline?: string | Date;
    attachments?: string[];
    skillsRequired?: string[];
    visibility?: ProjectVisibility;
}

export interface ProjectDto {
    id: string;
    clientId: string;
    title: string;
    description: string;
    budget: number;
    deadline?: Date | null;
    biddingDeadline: Date;
    attachments: string[];
    skillsRequired: string[];
    projectStatus: ProjectStatus;
    visibility: ProjectVisibility;
    selectedFreelancer: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectListDto {
    id: string;
    clientId: string;
    title: string;
    budget: number;
    projectStatus: ProjectStatus;
    visibility: ProjectVisibility;
    biddingDeadline: Date;
    createdAt: Date;
}




