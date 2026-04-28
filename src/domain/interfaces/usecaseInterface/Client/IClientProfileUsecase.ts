import { UserDto } from "../../../../application/dto/client.dto";

export interface IClientProfileUsecase {
    getClientProfile(userId : string): Promise<UserDto | null>
    // updateClientProfile(userId : string, data: Partial<User>) : Promise<User>
}