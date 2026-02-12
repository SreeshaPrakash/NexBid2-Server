import { injectable, inject } from 'tsyringe';

import { TokenPayload } from './../services/jwtService';
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IGoogleAuthservice } from "../../domain/interfaces/serviceInterface/IGoogleAuthServiceInterface";
import { IJwtService } from "../../domain/interfaces/serviceInterface/jwtServiceInterface";
import { IGoogleLoginUsecase } from "../../domain/interfaces/usecaseInterface/user/IGoogleLoginUsecase";
import { UnauthorizedError } from "../../shared/errorConstants";
import { GoogleLoginResponse } from "../dto/auth.dto";
import { UserRole } from '../../shared/roles';
import { logger } from '../../infrastructure/logging/logger';

@injectable()
export class GoogleLoginUsecase implements IGoogleLoginUsecase {
    constructor(
        @inject("IGoogleAuthservice") private _googleAuthService: IGoogleAuthservice,
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IJwtService") private _jwtService: IJwtService
    ){}

    async execute(idToken: string): Promise<GoogleLoginResponse> {
        const googleUser = await this._googleAuthService.verifyGoogleToken(idToken)

        let user = await this._userRepo.findByEmail(googleUser.email)
        let isNewUser = false

        if (!user) {
            isNewUser = true;

            const newUser: User = {
                id: "",
                email: googleUser.email,
                name: googleUser.name,
                googleId: googleUser.googleId,
                roles: ['client'],
                isEmailVerified: true,
                isBlocked: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            user = await this._userRepo.save(newUser)
            logger.info(`New google user created : `, user.email)

        } else {
            if (user.isBlocked) {
                throw new UnauthorizedError(`Your account is blocked`)
            }

            if (!user.googleId) {
                await this._userRepo.update(user.id, {
                    googleId: googleUser.googleId,
                    isEmailVerified: true
                })
                logger.info(`Linked Google account to existing user :`, user.email)
            }
        }

        const TokenPayload = {
            userId: user.id,
            email: user.email,
            roles: user.roles || [UserRole.CLIENT],
            activeRole: UserRole.CLIENT
        }

        const accessToken = this._jwtService.generateAccessToken(TokenPayload)
        const refreshToken = this._jwtService.generateRefreshToken(TokenPayload)

        logger.info(`Google login successful:`, user.email)

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles || [UserRole.CLIENT],
                isEmailVerified: user.isEmailVerified
            },
            accessToken,
            refreshToken,
            isNewUser
        }
    }

}

