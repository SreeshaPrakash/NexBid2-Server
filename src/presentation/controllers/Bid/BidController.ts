import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { HttpStatusCode } from '../../../shared/httpStatusCode';
import { ICreateBidUsecase } from '../../../domain/interfaces/usecaseInterface/bid/ICreateBidUsecase';
import { IGetBidsByProjectUsecase } from '../../../domain/interfaces/usecaseInterface/bid/IGetBidsByProjectUsecase';
import { IGetBidByFreelancerUsecase } from '../../../domain/interfaces/usecaseInterface/bid/IGetBidByFreelancerUsecase';
import { IUpdateBidUsecase } from '../../../domain/interfaces/usecaseInterface/bid/IUpdateBidUsecase';
import { IWithdrawBidUsecase } from '../../../domain/interfaces/usecaseInterface/bid/IWithdrawBidUsecase';
import { AppError } from '../../../shared/errorConstants';
import { BidMapper } from '../../../application/mappers/BidMapper';
import { z } from 'zod';


const PlaceBidSchema = z.object({
    bidAmount: z.number().positive("Bid amount must be positive"),
    deliveryTime: z.number().int().positive("Delivery time must be at least 1 day"),
    message: z.string().min(10, "Message must be at least 10 characters long")
});

const UpdateBidSchema = z.object({
    bidAmount: z.number().positive().optional(),
    deliveryTime: z.number().int().positive().optional(),
    message: z.string().min(10).optional()
}).refine(data => data.bidAmount || data.deliveryTime || data.message, {
    message: "At least one field must be provided for update"
});

@injectable()
export class BidController {
    constructor(
        @inject("ICreateBidUsecase") private _createBidUsecase: ICreateBidUsecase,
        @inject("IGetBidsByProjectUsecase") private _getBidsByProjectUsecase: IGetBidsByProjectUsecase,
        @inject("IGetBidByFreelancerUsecase") private _getBidByFreelancerUsecase: IGetBidByFreelancerUsecase,
        @inject("IUpdateBidUsecase") private _updateBidUsecase: IUpdateBidUsecase,
        @inject("IWithdrawBidUsecase") private _withdrawBidUsecase: IWithdrawBidUsecase
    ) { }

    placeBid = async (req: Request, res: Response): Promise<void> => {
        try {
            const validation = PlaceBidSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Validation failed",
                    errors: validation.error.format()
                });
                return;
            }

            const { projectId } = req.params as { projectId: string };
            const freelancerId = req.user!.userId;
            const bid = await this._createBidUsecase.execute({ ...req.body, projectId, freelancerId });
            res.status(HttpStatusCode.CREATED).json({ success: true, bid: BidMapper.toDto(bid) });

        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    getProjectBids = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params as { projectId: string };
            const bids = await this._getBidsByProjectUsecase.execute(projectId);
            res.status(HttpStatusCode.OK).json({ 
                success: true, 
                bids: BidMapper.toDtoList(bids),
                debug: {
                    projectId,
                    count: bids.length
                }
            });

        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    getMyBid = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params as { projectId: string };
            const freelancerId = req.user!.userId;
            const bid = await this._getBidByFreelancerUsecase.execute({ projectId, freelancerId });
            res.status(HttpStatusCode.OK).json({ success: true, bid: bid ? BidMapper.toDto(bid) : null });


        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    updateBid = async (req: Request, res: Response): Promise<void> => {
        try {
            const validation = UpdateBidSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Validation failed",
                    errors: validation.error.format()
                });
                return;
            }

            const { bidId } = req.params as { bidId: string };
            const freelancerId = req.user!.userId;
            const bid = await this._updateBidUsecase.execute({ ...req.body, bidId, freelancerId });
            res.status(HttpStatusCode.OK).json({ success: true, bid: bid ? BidMapper.toDto(bid) : null });


        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    withdrawBid = async (req: Request, res: Response): Promise<void> => {
        try {
            const { bidId } = req.params as { bidId: string };
            const freelancerId = req.user!.userId;
            const bid = await this._withdrawBidUsecase.execute({ bidId, freelancerId });
            res.status(HttpStatusCode.OK).json({ success: true, bid: bid ? BidMapper.toDto(bid) : null });


        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    private handleError(res: Response, error: Error): void {
        const appError = error as AppError;
        if (appError.statusCode) {
            res.status(appError.statusCode).json({ success: false, message: appError.message });
        } else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || "Internal Server Error" });
        }
    }
}
