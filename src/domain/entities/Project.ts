import { ProjectStatus, ProjectVisibility } from "../../shared/projectConstants";

export interface Project {
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
    isDeleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}




