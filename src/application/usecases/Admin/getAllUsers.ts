import { injectable, inject } from 'tsyringe';


import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IGetAllUsersUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IGetAllUsersUsecase";
import { UserRole } from "../../../shared/roles";
import { UserStatus } from "../../../shared/userStatusConstants";
import { GetUserQueryDTO, userListResponse } from "../../dto/admin.dto";
import { mapUsersToAdminListDTO } from "../../mappers/UserMapper";
@injectable()
export class GetAllUsersUsecase implements IGetAllUsersUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }

    async getAllUsers(query: GetUserQueryDTO): Promise<userListResponse> {
        const page = Number(query.page) || 1
        const limit = Number(query.limit) || 10

        const filter = this.buildUserFilter(query)

        const [users, total] = await Promise.all([
            this._userRepo.findAll(
                filter,
                (page - 1) * limit,
                limit,
                { [query.sortBy || 'createdAt']: query.sortOrder === 'asc' ? 1 : -1 }
            ),
            this._userRepo.count(filter)
        ])

        return {
            users: mapUsersToAdminListDTO(users),
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit) || 1,
                totalUsers: total,
                limit
            }
        }
    }

    private buildUserFilter(query: GetUserQueryDTO) {
        const filter: any = {
            roles: { $in: [UserRole.CLIENT, UserRole.FREELANCER] }
            // name : { $regex :  /am/i }
        }

        if (query.search?.trim()) {
            const search = query.search.trim()
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        }

        if (query.role?.trim()) {
            filter.roles = query.role?.trim()
        }

        if (query.status === UserStatus.BLOCKED) {
            filter.isBlocked = true
        }

        if (query.status === UserStatus.ACTIVE) {
            filter.isBlocked = false
        }

        return filter
    }
}
