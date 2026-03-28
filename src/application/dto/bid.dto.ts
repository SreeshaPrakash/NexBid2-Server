export interface UpdateBidDTO {
    bidId: string;
    freelancerId: string;
    bidAmount?: number;
    deliveryTime?: number;
    message?: string;
}
