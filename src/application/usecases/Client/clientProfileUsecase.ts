import { injectable, inject } from 'tsyringe';

import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IClientProfileUsecase } from "../../../domain/interfaces/usecaseInterface/Client/IClientProfileUsecase";
import { User } from "../../../domain/entities/User";
import { UserDto } from "../../dto/client.dto";
import { mapUserToDto } from '../../mappers/UserMapper';

@injectable()
export class ClientProfileUsecase implements IClientProfileUsecase {
    constructor(
        @inject('IUserRepository') private _userRepo: IUserRepository
    ) { }

    async getClientProfile(userId: string): Promise<UserDto | null> {
        const user = await this._userRepo.findById(userId)
        return user ? mapUserToDto(user) : null
    }


}


