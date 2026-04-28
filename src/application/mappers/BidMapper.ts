import { Bid } from "../../domain/entities/Bid";
import { BidDto } from "../dto/bid.dto";

export class BidMapper {
    public static toDto(bid: Bid): BidDto {
        return {
            id: bid.id,
            projectId: bid.projectId,
            freelancerId: bid.freelancerId,
            freelancerName: bid.freelancerName,
            freelancerTitle: bid.freelancerTitle,
            bidAmount: bid.bidAmount,
            deliveryTime: bid.deliveryTime,
            message: bid.message,
            status: bid.status,
            createdAt: bid.createdAt,
            updatedAt: bid.updatedAt
        };
    }

    public static toDtoList(bids: Bid[]): BidDto[] {
        return bids.map(bid => this.toDto(bid));
    }
}
