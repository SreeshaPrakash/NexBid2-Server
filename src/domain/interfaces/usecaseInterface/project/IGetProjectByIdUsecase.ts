import { Project } from "../../../../domain/entities/Project";

export interface GetProjectByIdInput {
    projectId: string;
    userId: string;
    userRole: "client" | "freelancer";
}

export interface IGetProjectByIdUsecase {
    execute(data: GetProjectByIdInput): Promise<Project>;
}
