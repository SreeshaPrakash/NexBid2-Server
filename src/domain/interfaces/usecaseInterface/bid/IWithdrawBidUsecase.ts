import { Bid } from "../../../entities/Bid";

export interface IWithdrawBidUsecase {
    execute(data: {
        bidId: string;
        freelancerId: string;
    }): Promise<Bid>;
}
