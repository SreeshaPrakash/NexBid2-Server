import { Project } from "../../../entities/Project";

export interface IProjectRepository {
    create(project: Project): Promise<Project>;

    findById(projectId: string): Promise<Project | null>;

    findByClient(clientId: string): Promise<Project[]>;

    findOpenProjects(): Promise<Project[]>;

    update(projectId: string, data: Partial<Project>): Promise<Project>;
    
    delete(projectId: string): Promise<void>;
}
