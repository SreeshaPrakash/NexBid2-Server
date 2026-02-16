import { injectable } from 'tsyringe';

import { BaseRepository } from './BaseRepository';
import { User } from '../../domain/entities/User';
import { userModel } from '../database/UserModel';
import { IUserRepository } from './../../domain/interfaces/repositoryInterface/user/IUserRepository';


@injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {

    constructor() {
        super(userModel)
    }
    protected toEntity(doc: any): User {
        return {
            // id : doc._id.toString(),
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            password: doc.password,
            phone: doc.phone,
            roles: doc.roles,
            isEmailVerified: doc.isEmailVerified,
            isBlocked: doc.isBlocked,
            googleId: doc.googleId
        }
    }

    protected toDocument(entity: User): Partial<User> {
        return {
            email: entity.email,
            name: entity.name,
            roles: entity.roles,
            isEmailVerified: entity.isEmailVerified,
            isBlocked: entity.isBlocked,
            password: entity.password,
            phone: entity.phone,
            googleId: entity.googleId
        }
    }

    async save(user: User): Promise<User> {
        return this.create(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.findOne({ email })
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        return super.update(id, user)
    }

    async findById(id: string): Promise<User | null> {
        return super.findById(id)
    }

    async findAll(
        filter: any,
        skip: number,
        limit: number,
        sort: any
    ): Promise<User[]> {
        const docs = await this.model
            .find(filter)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .exec();

        return docs.map((doc) => this.toEntity(doc))
    }

    async count(filter: any): Promise<number> {
        return await this.model.countDocuments(filter)
    }

    async getUserStats(statsFilter: any): Promise<{
        total: number;
        active: number;
        blocked: number;
        clients: number;
        freelancers: number;
    }> {
        const stats = await this.model.aggregate([
            { $match: statsFilter },
            {
                $facet: {
                    active: [{ $match: { isBlocked: false } }, { $count: "count" }],
                    blocked: [{ $match: { isBlocked: true } }, { $count: "count" }],
                    clients: [{ $match: { roles: "client" } }, { $count: "count" }],
                    freelancers: [{ $match: { roles: "freelancer" } }, { $count: "count" }]
                }
            },
            {
                $project: {
                    active: { $ifNull: [{ $arrayElemAt: ["$active.count", 0] }, 0] },
                    blocked: { $ifNull: [{ $arrayElemAt: ["$blocked.count", 0] }, 0] },
                    clients: { $ifNull: [{ $arrayElemAt: ["$clients.count", 0] }, 0] },
                    freelancers: { $ifNull: [{ $arrayElemAt: ["$freelancers.count", 0] }, 0] }
                }
            }
        ]);

        const result = stats[0];
        return {
            ...result,
            total: result.active + result.blocked
        };
    }






}


