import { injectable } from 'tsyringe';
import mongoose from 'mongoose';
import { BaseRepository } from './BaseRepository';
import { Project } from '../../domain/entities/Project';
import { ProjectStatus, ProjectVisibility } from '../../shared/projectConstants';
import { ProjectModel, IProject } from '../database/ProjectModel';
import { IProjectRepository } from '../../domain/interfaces/repositoryInterface/project/IProjectRepository';

@injectable()
export class ProjectRepository extends BaseRepository<Project> implements IProjectRepository {
    constructor() {
        super(ProjectModel);
    }

    protected toEntity(doc: IProject): Project {
        return {
            id: (doc._id as mongoose.Types.ObjectId).toString(),
            clientId: doc.clientId.toString(),
            title: doc.title,
            description: doc.description,
            budget: doc.budget,
            deadline: doc.deadline,
            biddingDeadline: doc.biddingDeadline,
            attachments: doc.attachments,
            skillsRequired: doc.skillsRequired,
            projectStatus: doc.projectStatus as ProjectStatus,
            visibility: doc.visibility as ProjectVisibility,
            selectedFreelancer: doc.selectedFreelancer ? doc.selectedFreelancer.toString() : null,
            isDeleted: doc.isDeleted,
            deletedAt: doc.deletedAt,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };
    }

    protected toDocument(entity: Project | Partial<Project>): Partial<Project> {
        // We return Partial<Project> directly.
        // Mongoose automatically converts string IDs (clientId, selectedFreelancer)
        // to ObjectIds based on the Schema definition.
        return {
            clientId: entity.clientId,
            title: entity.title,
            description: entity.description,
            budget: entity.budget,
            deadline: entity.deadline,
            biddingDeadline: entity.biddingDeadline,
            attachments: entity.attachments,
            skillsRequired: entity.skillsRequired,
            projectStatus: entity.projectStatus,
            visibility: entity.visibility,
            selectedFreelancer: entity.selectedFreelancer,
            isDeleted: entity.isDeleted,
            deletedAt: entity.deletedAt
        };
    }

    async findByClient(clientId: string): Promise<Project[]> {
        const docs = await this.model.find({ clientId: new mongoose.Types.ObjectId(clientId) }).exec();
        return docs.map(doc => this.toEntity(doc as IProject));
    }

    async findOpenProjects(): Promise<Project[]> {
        const docs = await this.model.find({
            projectStatus: ProjectStatus.OPEN,
            visibility: ProjectVisibility.PUBLIC
        }).exec();
        return docs.map(doc => this.toEntity(doc as IProject));
    }

    async findById(projectId: string): Promise<Project | null> {
        return super.findById(projectId);
    }

    async update(projectId: string, data: Partial<Project>): Promise<Project> {
        return super.update(projectId, data);
    }

    async delete(projectId: string): Promise<void> {
        await this.model.findByIdAndDelete(projectId).exec();
    }
}
