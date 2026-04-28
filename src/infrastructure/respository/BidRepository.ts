import { injectable } from 'tsyringe';
import mongoose from 'mongoose';
import { BaseRepository } from './BaseRepository';
import { Bid } from '../../domain/entities/Bid';
import { BidModel } from '../database/BidModel';
import { IBidRepository } from '../../domain/interfaces/repositoryInterface/bid/IBidRepository';

@injectable()
export class BidRepository extends BaseRepository<Bid> implements IBidRepository {
    constructor() {
        super(BidModel);
    }

    protected toEntity(doc: any): Bid {
        const freelancerId = doc.freelancerId && doc.freelancerId._id ? doc.freelancerId._id.toString() : doc.freelancerId.toString();
        return {
            id: (doc._id as mongoose.Types.ObjectId).toString(),
            projectId: doc.projectId.toString(),
            freelancerId,
            freelancerName: doc.freelancerName,
            freelancerTitle: doc.freelancerTitle,
            bidAmount: doc.bidAmount,
            deliveryTime: doc.deliveryTime,
            message: doc.message,
            status: doc.status,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };
    }

    protected toDocument(entity: Partial<Bid>): any {
        const doc: any = {};
        if (entity.projectId !== undefined) doc.projectId = new mongoose.Types.ObjectId(entity.projectId);
        if (entity.freelancerId !== undefined) doc.freelancerId = new mongoose.Types.ObjectId(entity.freelancerId);
        if (entity.bidAmount !== undefined) doc.bidAmount = entity.bidAmount;
        if (entity.deliveryTime !== undefined) doc.deliveryTime = entity.deliveryTime;
        if (entity.message !== undefined) doc.message = entity.message;
        if (entity.status !== undefined) doc.status = entity.status;
        if (entity.updatedAt !== undefined) doc.updatedAt = entity.updatedAt;

        if (entity.id) {
            doc._id = new mongoose.Types.ObjectId(entity.id);
        }
        return doc;
    }

    async findByProject(projectId: string, status?: string): Promise<Bid[]> {
        const query: any = { projectId: new mongoose.Types.ObjectId(projectId) };
        if (status) {
            query.status = status;
        }

        const docs = await this.model.find(query)
            .populate('freelancerId', 'name')
            .populate('freelancerProfile', 'title')
            .sort({ createdAt: -1 })
            .exec();

        return docs.map(doc => {
            const entity = this.toEntity(doc);
            entity.freelancerName = (doc.freelancerId as any)?.name;
            entity.freelancerTitle = (doc.freelancerProfile as any)?.title;
            return entity;
        });
    }

    async findByFreelancerAndProject(freelancerId: string, projectId: string): Promise<Bid | null> {
        const doc = await this.model.findOne({
            freelancerId: new mongoose.Types.ObjectId(freelancerId),
            projectId: new mongoose.Types.ObjectId(projectId)
        })
            .populate('freelancerId', 'name')
            .populate('freelancerProfile', 'title')
            .exec();

        if (!doc) return null;

        const entity = this.toEntity(doc);
        entity.freelancerName = (doc.freelancerId as any)?.name;
        entity.freelancerTitle = (doc.freelancerProfile as any)?.title;
        return entity;
    }

    async findById(bidId: string): Promise<Bid | null> {
        return super.findById(bidId);
    }

    async update(bidId: string, data: Partial<Bid>): Promise<Bid> {
        return super.update(bidId, data);
    }

    async delete(bidId: string): Promise<void> {
        await this.model.findByIdAndDelete(bidId).exec();
    }

    async countByFreelancer(freelancerId: string): Promise<number> {
        return await this.model.countDocuments({
            freelancerId: new mongoose.Types.ObjectId(freelancerId),
            status: 'active'
        }).exec();
    }

    async countTotalBidsForClientProjects(clientId: string): Promise<number> {
        const projectModel = mongoose.model('Project');
        const clientProjectIds = await projectModel.find({
            clientId: new mongoose.Types.ObjectId(clientId),
            isDeleted: false
        }).select('_id').exec();

        const ids = clientProjectIds.map(p => p._id);

        return await this.model.countDocuments({
            projectId: { $in: ids },
            status: 'active'
        }).exec();
    }
}
