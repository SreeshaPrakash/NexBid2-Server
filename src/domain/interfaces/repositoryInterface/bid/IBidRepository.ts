import { Bid } from "../../../entities/Bid";

export interface IBidRepository {
    create(bid: Bid): Promise<Bid>;
    findById(bidId: string): Promise<Bid | null>;
    findByProject(projectId: string, status?: string): Promise<Bid[]>;
    findByFreelancerAndProject(freelancerId: string, projectId: string): Promise<Bid | null>;
    update(bidId: string, data: Partial<Bid>): Promise<Bid>;
    delete(bidId: string): Promise<void>;
    countByFreelancer(freelancerId: string): Promise<number>;
    countTotalBidsForClientProjects(clientId: string): Promise<number>;
}
