import { injectable, inject } from "tsyringe";
import { IUpdateClientProfileUsecase } from "../../../domain/interfaces/usecaseInterface/Client/IClientUpdateProfileUsecase";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from '../../../domain/interfaces/repositoryInterface/user/IUserRepository';


@injectable()
export class UpdateclientProfileUsecase implements IUpdateClientProfileUsecase {

    constructor(
         @inject ('IUserRepository') private _userRepo : IUserRepository
    ){}

    async execute(userId: string, data: Partial<User>): Promise<User> {
        const updatedUser = await this._userRepo.update(userId, data)
        return updatedUser
    }
}