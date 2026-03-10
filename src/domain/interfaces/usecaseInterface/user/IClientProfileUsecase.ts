
import { User } from "../../../entities/User";

export interface IClientProfileUsecase {
    getClientProfile(userId : string): Promise<User | null>
    updateClientProfile(userId : string, data: Partial<User>) : Promise<User>
}