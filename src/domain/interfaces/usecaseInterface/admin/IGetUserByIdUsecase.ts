import { UserDto } from "../../../../application/dto/client.dto"
export interface IGetUserByIdUsecase {
    
    getUserById(userId: string): Promise<UserDto>

}
