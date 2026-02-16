import { injectable } from 'tsyringe';

import { FreelancerMapper } from './../../application/mappers/FreelanceMapper';
    
import { Freelancer } from "../../domain/entities/Freelancer";
import { IFreelancerRepository } from "../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { FreelancerModel } from "../database/FreelancerModel";


@injectable()
export class FreelancerRepository implements IFreelancerRepository{
    
    async create(data: Partial<Freelancer>): Promise<Freelancer> {
        const freelancer = await FreelancerModel.create(data)
        return FreelancerMapper.toDomain(freelancer)
    }

    async findById(id: string): Promise<Freelancer | null> {
        const freelancer = await FreelancerModel.findById(id).populate("userId").exec()
        return freelancer ? FreelancerMapper.toDomain(freelancer) : null
    }

    async update(id: string, data: Partial<Freelancer>): Promise<Freelancer | null> {
        const freelancer = await FreelancerModel.findByIdAndUpdate(
            id, {$set : data} , {new : true})
        return freelancer ? FreelancerMapper.toDomain(freelancer) : null
    }

    async findByUserId(userId: string): Promise<Freelancer | null> {
        const freelancer = await FreelancerModel.findOne({userId}).populate("userId").exec()
        return freelancer ? FreelancerMapper.toDomain(freelancer) : null
    }

}