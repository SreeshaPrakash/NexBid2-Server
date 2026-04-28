import { Bid } from "../../../entities/Bid";
import { UpdateBidDTO } from "../../../../application/dto/bid.dto";

export interface IUpdateBidUsecase {
    execute(data: UpdateBidDTO): Promise<Bid>;
}
