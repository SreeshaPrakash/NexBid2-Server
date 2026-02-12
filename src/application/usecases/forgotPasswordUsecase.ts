import { injectable, inject } from "tsyringe";

import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IOtpService } from "../../domain/interfaces/serviceInterface/otpServiceInterface";
import { IForgotPasswordUsecase } from "../../domain/interfaces/usecaseInterface/user/IForgotPasswordUsecase";
import { logger } from "../../infrastructure/logging/logger";
import { NotFoundError, UnauthorizedError, ValidationError } from "../../shared/errorConstants";
import { MESSAGES } from "../../shared/messages";


@injectable()
export class ForgotPasswordUsecase implements IForgotPasswordUsecase {
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) {}

    async execute(email: string): Promise<boolean> {

        if (!email) {
            throw new ValidationError(MESSAGES.EMAIL_REQUIRED)
        }

        const user = await this._userRepo.findByEmail(email)

        if (!user) {
            throw new NotFoundError(MESSAGES.USER_NOT_FOUND)
        }

        if (!user.isEmailVerified) {
            throw new UnauthorizedError('Please verify your email first before resettinf password')
        }

        if (!user.password) {
            throw new ValidationError('This account uses Google login. Please use Sign in with Google')
        }

        await this._otpService.resendOtp(email)
        logger.info(`Password reset otp sent to ${email}`)
        return true

    }
}

