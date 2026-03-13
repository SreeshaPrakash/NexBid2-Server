


import {User} from "../../../entities/User"
export interface IUpdateClientProfileUsecase {
    execute(userId: string, data: Partial<User> ) : Promise<User>
}