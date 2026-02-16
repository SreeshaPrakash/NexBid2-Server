import { injectable, inject } from 'tsyringe';


import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IGetUserByIdUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IGetUserByIdUsecase";
import { NotFoundError, ValidationError } from "../../../shared/errorConstants";
import { MESSAGES } from "../../../shared/messages";
import { UserDto } from "../../dto/auth.dto";
import { mapUserToDto } from "../../mappers/UserMapper";

@injectable()
export class GetUserByIdUsecase implements IGetUserByIdUsecase {
    
    constructor(
        @inject ("IUserRepository") private _userRepo : IUserRepository
    ) {}

    async getUserById(userId: string): Promise<UserDto> {
        if(!userId) throw new ValidationError('User Id required')

        const user = await this._userRepo.findById(userId)
        if(!user) throw new NotFoundError(MESSAGES.USER_NOT_FOUND)

        return mapUserToDto(user)
    }
}