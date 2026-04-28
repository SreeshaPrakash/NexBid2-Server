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

    async findByClient(clientId: string, page: number = 1, limit: number = 10, status?: string): Promise<{ projects: Project[], total: number }> {
        const query: any = { 
            clientId: new mongoose.Types.ObjectId(clientId),
            projectStatus: { $ne: ProjectStatus.CANCELLED }
        };
        if (status) {
            query.projectStatus = status;
        }
        const total = await this.model.countDocuments(query).exec();
        const docs = await this.model.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return {
            projects: docs.map(doc => this.toEntity(doc as IProject)),
            total
        };
    }

    async findOpenProjects(excludeClientId?: string, page: number = 1, limit: number = 10): Promise<{ projects: Project[], total: number }> {
        const query: any = {
            projectStatus: ProjectStatus.OPEN,
            visibility: ProjectVisibility.PUBLIC,
            isDeleted: false,
            biddingDeadline: { $gt: new Date() }
        };

        if (excludeClientId) {
            query.clientId = { $ne: new mongoose.Types.ObjectId(excludeClientId) };
        }

        const total = await this.model.countDocuments(query).exec();
        const docs = await this.model.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return {
            projects: docs.map(doc => this.toEntity(doc as IProject)),
            total
        };
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

    async countActiveByClient(clientId: string): Promise<number> {
        return await this.model.countDocuments({
            clientId: new mongoose.Types.ObjectId(clientId),
            projectStatus: { $in: [ProjectStatus.OPEN, ProjectStatus.IN_PROGRESS] },
            isDeleted: false
        }).exec();
    }

    async findRecommendedForFreelancer(skills: string[], excludeClientId?: string): Promise<Project[]> {
        const query: any = {
            projectStatus: ProjectStatus.OPEN,
            visibility: ProjectVisibility.PUBLIC,
            skillsRequired: { $in: skills },
            isDeleted: false,
            biddingDeadline: { $gt: new Date() }
        };

        if (excludeClientId) {
            query.clientId = { $ne: new mongoose.Types.ObjectId(excludeClientId) };
        }

        const docs = await this.model.find(query).sort({ createdAt: -1 }).limit(5).exec();
        return docs.map(doc => this.toEntity(doc as IProject));
    }

    async countByClientAndStatus(clientId: string, status: string): Promise<number> {
        return await this.model.countDocuments({
            clientId: new mongoose.Types.ObjectId(clientId),
            projectStatus: status,
            isDeleted: false
        }).exec();
    }

    async sumBudgetByClientAndStatus(clientId: string, status: string): Promise<number> {
        const result = await this.model.aggregate([
            {
                $match: {
                    clientId: new mongoose.Types.ObjectId(clientId),
                    projectStatus: status,
                    isDeleted: false
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$budget' }
                }
            }
        ]).exec();
        return result.length > 0 ? result[0].total : 0;
    }

    async countByFreelancerAndStatus(freelancerId: string, status: string): Promise<number> {
        return await this.model.countDocuments({
            selectedFreelancer: new mongoose.Types.ObjectId(freelancerId),
            projectStatus: status,
            isDeleted: false
        }).exec();
    }

    async sumBudgetByFreelancerAndStatus(freelancerId: string, status: string): Promise<number> {
        const result = await this.model.aggregate([
            {
                $match: {
                    selectedFreelancer: new mongoose.Types.ObjectId(freelancerId),
                    projectStatus: status,
                    isDeleted: false
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$budget' }
                }
            }
        ]).exec();
        return result.length > 0 ? result[0].total : 0;
    }
}
