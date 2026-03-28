import { Project } from "../../../../domain/entities/Project";
import { ClientProjectDTO } from "../../../../application/dto/project.dto";

export interface ICreateProjectUsecase {
    execute(data: ClientProjectDTO): Promise<Project>;
}
