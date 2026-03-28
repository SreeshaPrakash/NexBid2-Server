import { injectable, inject } from "tsyringe";
import { Bid } from "../../../domain/entities/Bid";
import { IBidRepository } from "../../../domain/interfaces/repositoryInterface/bid/IBidRepository";
import { IGetBidsByProjectUsecase } from "../../../domain/interfaces/usecaseInterface/bid/IGetBidsByProjectUsecase";
import { IProjectRepository } from "../../../domain/interfaces/repositoryInterface/project/IProjectRepository";
import { ProjectStatus } from "../../../shared/projectConstants";

@injectable()
export class GetBidsByProjectUsecase implements IGetBidsByProjectUsecase {
    constructor(
        @inject("IBidRepository") private _bidRepository: IBidRepository,
        @inject("IProjectRepository") private _projectRepository: IProjectRepository
    ) { }

    async execute(projectId: string): Promise<Bid[]> {

        const project = await this._projectRepository.findById(projectId);
        if (!project || project.projectStatus !== ProjectStatus.OPEN) {
            return [];
        }

        return await this._bidRepository.findByProject(projectId, 'active');
    }
}
