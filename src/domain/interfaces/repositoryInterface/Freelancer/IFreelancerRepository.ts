import { Freelancer } from "../../../entities/Freelancer";

export interface IFreelancerRepository {
    create(data : Partial<Freelancer>) : Promise<Freelancer>

    findById(id : string) : Promise<Freelancer | null>

    findByUserId(userId: string): Promise<Freelancer | null>;

    // updateStatus(id: string, data: Pick<Freelancer , 'isActive'>) : Promise<boolean>

    update(id:string, data : Partial<Freelancer>) : Promise<Freelancer | null>

    // findAll(filter: any) : Promise<Freelancer[]>

}