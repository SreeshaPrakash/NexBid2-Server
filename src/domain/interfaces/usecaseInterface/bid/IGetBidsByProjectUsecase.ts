import { Bid } from "../../../entities/Bid";

export interface IGetBidsByProjectUsecase {
    execute(projectId: string): Promise<Bid[]>;
}
