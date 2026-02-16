import { injectable, inject } from 'tsyringe';

import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IJwtService } from "../../domain/interfaces/serviceInterface/jwtServiceInterface";
import { IRefreshTokenUsecase } from "../../domain/interfaces/usecaseInterface/user/IRefreshTokenUsecase";
import { UnauthorizedError } from "../../shared/errorConstants";
import { MESSAGES } from "../../shared/messages";
import { RefreshTokenResponse } from "../dto/auth.dto";
import { logger } from '../../infrastructure/logging/logger';

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {

    constructor(
        @inject("IJwtService") private _jwtService: IJwtService,
        @inject("IUserRepository") private _userRepo: IUserRepository
    ) { }

    async execute(refreshToken: string): Promise<RefreshTokenResponse> {
        if (!refreshToken) {
            throw new UnauthorizedError(MESSAGES.REFRESHTOKEN_REQUIRED)
        }

        try {
            const decoded = this._jwtService.verifyRefreshToken(refreshToken)
            console.log(decoded)
            const user = await this._userRepo.findById(decoded.userId)

            if (!user) {
                throw new UnauthorizedError(MESSAGES.USER_NOT_FOUND)
            }

            if (user.isBlocked) {
                throw new Error(MESSAGES.USER_ACC_BLOCKED)
            }

            const tokenPayload = {
                userId: user.id,
                email: user.email,
                roles: user.roles || ['client'],
                activeRole: decoded.activeRole
            }

            const newAccessToken = this._jwtService.generateAccessToken(tokenPayload)
            const newRefreshToken = this._jwtService.generateRefreshToken(tokenPayload)
            logger.info(`Token refreshed for user :  ${user.email}`)

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            }

        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedError('Refresh token has expired. Please login again')
            }
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedError('Invalid refresh token')
            }
            throw error;
        }
    }
}