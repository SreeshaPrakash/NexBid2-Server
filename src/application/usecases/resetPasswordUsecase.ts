import bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/interfaces/repositoryInterface/user/IUserRepository';
import { IOtpService } from '../../domain/interfaces/serviceInterface/otpServiceInterface';
import { NotFoundError, ValidationError } from '../../shared/errorConstants';
import { ResetPasswordDTO } from '../dto/auth.dto';
import { IResetPasswordUsecase } from './../../domain/interfaces/usecaseInterface/user/IResetPasswordUsecase';
import { logger } from '../../infrastructure/logging/logger';


export class ResetPasswordUsecase implements IResetPasswordUsecase {

    constructor(
        private _userRepo: IUserRepository,
        private _otpService: IOtpService
    ) { }


    async execute(data: ResetPasswordDTO): Promise<boolean> {

        const { email, otp, newPassword } = data

        if (!email || !otp || !newPassword) {
            throw new ValidationError('Email, otp and new password are required ')
        }

        if (newPassword.length < 8) {
            throw new ValidationError('Email must be at least 8 characters')
        }

        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            throw new ValidationError(
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            );
        }

        const isOtpValid = await this._otpService.verifyOtp(email, otp)
        if (!isOtpValid) {
            throw new ValidationError("Invalid or expired OTP");
        }

        const user = await this._userRepo.findByEmail(email)
        if (!user) {
            throw new NotFoundError('User not found')
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await this._userRepo.update(user.id, {
            password: hashedPassword
        })

        logger.info(`Password reset successful for : ${email}`);
        return true;
    }

}