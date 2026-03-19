import { Freelancer } from "../../../entities/Freelancer";

export interface IFreelancerRepository {
    create(data : Partial<Freelancer>) : Promise<Freelancer>

    findById(id : string) : Promise<Freelancer | null>

    findByUserId(userId: string): Promise<Freelancer | null>;

    update(id:string, data : Partial<Freelancer>) : Promise<Freelancer | null>

    findPendingVerifications() : Promise<Freelancer[]> 
    
}