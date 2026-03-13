import { UserDto } from "../../../../application/dto/client.dto";
import { User } from "../../../entities/User";

export interface IClientProfileUsecase {
    getClientProfile(userId : string): Promise<UserDto | null>
    // updateClientProfile(userId : string, data: Partial<User>) : Promise<User>
}