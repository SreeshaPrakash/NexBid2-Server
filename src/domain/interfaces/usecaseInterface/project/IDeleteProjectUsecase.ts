import { Project } from "../../../../domain/entities/Project";

export interface DeleteProjectInput {
    projectId: string;
    clientId: string;
}

export interface IDeleteProjectUsecase {
    execute(data: DeleteProjectInput): Promise<Project>;
}
