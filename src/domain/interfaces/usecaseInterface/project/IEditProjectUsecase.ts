import { Project } from "../../../../domain/entities/Project";
import { ClientProjectDTO } from "../../../../application/dto/project.dto";

export interface IEditProjectUsecase {
    execute(data: ClientProjectDTO): Promise<Project>;
}
