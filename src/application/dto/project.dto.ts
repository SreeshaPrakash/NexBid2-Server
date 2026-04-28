import { ProjectVisibility } from "../../shared/projectConstants";

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
