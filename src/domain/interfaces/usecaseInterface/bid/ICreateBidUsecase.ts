import { Bid } from "../../../entities/Bid";

export interface ICreateBidUsecase {
    execute(data: {
        projectId: string;
        freelancerId: string;
        bidAmount: number;
        deliveryTime: number;
        message: string;
    }): Promise<Bid>;
}
