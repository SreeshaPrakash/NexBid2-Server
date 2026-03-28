import { Project } from "../../../../domain/entities/Project";
import { ProjectStatus } from "../../../../shared/projectConstants";

export interface IGetClientProjectsUsecase {
    execute(clientId: string, status?: ProjectStatus): Promise<Project[]>;
}
