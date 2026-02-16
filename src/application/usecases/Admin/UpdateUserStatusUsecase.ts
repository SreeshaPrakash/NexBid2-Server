import { injectable, inject } from 'tsyringe';


import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IUpdateUserStatusUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IUpdateUserStatusUsecase";
import { NotFoundError, ValidationError } from "../../../shared/errorConstants";
import { MESSAGES } from "../../../shared/messages";

@injectable()
export class UpdateUserStatusUsecase implements IUpdateUserStatusUsecase {
    
    constructor(
        @inject ("IUserRepository") private _userRepo : IUserRepository
    ) {}

    async toggleBlockStatus(userId: string, isBlocked: boolean): Promise<boolean> {

        if(!userId) throw new ValidationError("User ID is required")

        const user = await this._userRepo.findById(userId)
        if(!user) throw new NotFoundError(MESSAGES.USER_NOT_FOUND)

        if(user.isBlocked === isBlocked) {
            throw new ValidationError(MESSAGES.USER_ACC_BLOCKED)
        }

        await this._userRepo.update(userId, {isBlocked})

        return true;
    }
    
}