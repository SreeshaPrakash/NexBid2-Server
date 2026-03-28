import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcrypt';
import { IUserRepository } from "../../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IJwtService } from "../../../domain/interfaces/serviceInterface/jwtServiceInterface";
import { IAdminLoginUsecase } from "../../../domain/interfaces/usecaseInterface/admin/IAdminLoginUsecase";
import { ForbiddenError, UnauthorizedError, ValidationError } from "../../../shared/errorConstants";
import { MESSAGES } from "../../../shared/messages";
import { UserRole } from "../../../shared/roles";
import { AdminLoginResponse } from "../../dto/admin.dto";
import { LoginDTO } from "../../dto/auth.dto";


@injectable()
export class AdminLoginUsecase implements IAdminLoginUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IJwtService") private _jwtService: IJwtService
    ) { }


    async execute(loginData: LoginDTO): Promise<AdminLoginResponse> {
        const { email, password } = loginData

        if (!email || !password) {
            throw new ValidationError('Email and Password required')
        }

        const user = await this._userRepo.findByEmail(email)

        if (!user) {
            throw new UnauthorizedError('Invalid admin data')
        }

        // Check password if it exists
        if (user.password) {
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                throw new UnauthorizedError('Invalid admin credentials')
            }
        } else {
            throw new UnauthorizedError('This account does not have a direct password set')
        }

        if (user.isBlocked) {
            throw new ForbiddenError(MESSAGES.USER_ACC_BLOCKED)
        }

        const isAdmin = user.roles?.includes(UserRole.ADMIN)

        if (!isAdmin) {
            throw new UnauthorizedError('Access denied: Unauthorized admini access')
        }

        const tokenPayload = {
            userId: user.id,
            email: user.email,
            roles: user.roles ?? [],
            activeRole: UserRole.ADMIN
        }

        const accessToken = this._jwtService.generateAccessToken(tokenPayload)
        const refreshToken = this._jwtService.generateRefreshToken(tokenPayload)


        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles ?? [],
                activeRole: UserRole.ADMIN,
                isEmailVerified: user.isEmailVerified
            },
            accessToken,
            refreshToken
        }
    }

}