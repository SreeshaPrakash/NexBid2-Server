import { Project } from "../../../../domain/entities/Project";

export interface IGetOpenProjectsUsecase {
    execute(): Promise<Project[]>;
}
