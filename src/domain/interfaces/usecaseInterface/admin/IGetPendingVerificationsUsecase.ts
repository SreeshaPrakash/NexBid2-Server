import { Freelancer } from "../../../entities/Freelancer";

export interface IGetPendingVerificationsUsecase {
    execute(): Promise<Freelancer[]>
}
