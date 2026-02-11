import { User } from './../../domain/entities/User';
import redis from "../../config/redis";
import bcrypt from "bcrypt";
import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IOtpService } from "../../domain/interfaces/serviceInterface/otpServiceInterface";
import { IVerifyOtpUsecase } from "../../domain/interfaces/usecaseInterface/user/IVerifyOtpUsecase";
import { RegisterDTO, VerifyOtpDTO, VerifyOtpResponse } from "../dto/auth.dto";
import { UserRole } from '../../shared/roles';
import { logger } from '../../infrastructure/logging/logger';


export class VerifyOtpUsecase implements IVerifyOtpUsecase {

    constructor(
        private _userRepo: IUserRepository,
        private _otpService: IOtpService,
    ) { }

    async execute(verifyData: VerifyOtpDTO): Promise<VerifyOtpResponse> {

        const { email, otp } = verifyData;
        const isValid = await this._otpService.verifyOtp(email, otp)

         logger.info('otp verification result : ', isValid)


        if (!isValid) {
            throw new Error('Invalid or expired OTP')
        }

        const tempUserKey = `tempUser:${email}`
        const tempUserData = await redis.get(tempUserKey)   //data stored in redis will be in json format

        if (!tempUserData) {
            throw new Error('Registration session expired, please register again')
        }

        const userData: RegisterDTO = JSON.parse(tempUserData)
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newUser: User = {
            id: "",
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            roles: ['client'],
            isEmailVerified: true,
            isBlocked: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const savedUser = await this._userRepo.save(newUser)
        await redis.del(tempUserKey)

        logger.info(`User verified and saved : ${savedUser.email}`)


        return {
            user: {
                id: savedUser.id,
                email: savedUser.email,
                name: savedUser.name,
                roles: savedUser.roles || [UserRole.CLIENT],
                isEmailVerified: savedUser.isEmailVerified || false

            }
        }

    }

}