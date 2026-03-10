import { injectable , inject} from 'tsyringe';

import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IClientProfileUsecase } from "../../../domain/interfaces/usecaseInterface/user/IClientProfileUsecase";
import { User } from "../../../domain/entities/User";

@injectable()
export class ClientProfileUsecase implements IClientProfileUsecase {
    constructor (
        @inject ('IUserRepository') private _userRepo : IUserRepository
    ){}

    async getClientProfile(userId: string): Promise<User | null> {
        //  return this._userRepo.findById(userId)
        
        const user = await this._userRepo.findById(userId)
        if (user) {
            const { password, ...userWithoutPassword } = user
            return userWithoutPassword as User
        }
        return null
    }



    async updateClientProfile(userId: string, data: Partial<User>): Promise<User> {
        const updatedUser = await this._userRepo.update(userId, data)
        return updatedUser
    }
}


