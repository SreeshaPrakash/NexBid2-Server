import { injectable, inject } from "tsyringe";


import { IFreelancerRepository } from "../../domain/interfaces/repositoryInterface/Freelancer/IFreelancerRepository";
import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IJwtService } from "../../domain/interfaces/serviceInterface/jwtServiceInterface";
import { ISwitchRoleUsecase } from "../../domain/interfaces/usecaseInterface/user/ISwitchRoleUsecase";
import { UnauthorizedError, ValidationError } from "../../shared/errorConstants";
import { MESSAGES } from "../../shared/messages";
import { UserRole } from "../../shared/roles";
import { SwitchRoleResponse } from "../dto/auth.dto";


@injectable()
export class SwitchRoleusecase implements ISwitchRoleUsecase {

    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IJwtService") private _jwtService: IJwtService,
        @inject("IFreelancerRepository") private _freelancerRepo: IFreelancerRepository
    ) { }

    async execute(userId: string, requestedRole: string): Promise<SwitchRoleResponse> {
        if (!requestedRole) {
            throw new ValidationError("Invalid Error")
        }

        const user = await this._userRepo.findById(userId)
        if (!user) {
            throw new UnauthorizedError(MESSAGES.USER_NOT_FOUND)
        }

        if (user.isBlocked) {
            throw new UnauthorizedError(MESSAGES.USER_ACC_BLOCKED)
        }

        const roles = user.roles || [];

        if (!roles.includes(requestedRole as UserRole)) {
            if (requestedRole == UserRole.FREELANCER) {
                roles.push(UserRole.FREELANCER)
                await this._userRepo.update(userId, { roles })
            } else {
                throw new UnauthorizedError(
                    `You are not allowed to switch to ${requestedRole} role`
                )
            }
        }

        let hasProfile = true
        if (requestedRole == UserRole.FREELANCER) {
            const freelancerProfile = await this._freelancerRepo.findByUserId(userId)
            hasProfile = !!freelancerProfile
        }

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            roles: roles,
            activeRole: requestedRole,
        }

        const accessToken = this._jwtService.generateAccessToken(tokenPayload)
        const refreshToken = this._jwtService.generateRefreshToken(tokenPayload)

        return {
            accessToken,
            refreshToken,
            hasProfile
        }
    }
}