import { UserDto } from "../../../../application/dto/auth.dto";

export interface IGetUserByIdUsecase {
    
    getUserById(userId: string): Promise<UserDto>

}
