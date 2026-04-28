export interface UpdateBidDTO {
    bidId: string;
    freelancerId: string;
    bidAmount?: number;
    deliveryTime?: number;
    message?: string;
}

export interface BidDto {
    id: string;
    projectId: string;
    freelancerId: string;
    freelancerName?: string;
    freelancerTitle?: string;
    bidAmount: number;
    deliveryTime: number; // in days
    message: string;
    status: 'active' | 'withdrawn' | 'accepted' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

