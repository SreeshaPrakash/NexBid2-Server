
import { inject, injectable } from "tsyringe";
import { IUserRepository } from './../../domain/interfaces/repositoryInterface/user/IUserRepository';
import { RegisterDTO } from '../dto/auth.dto';
import { IUserRegisterUsecase } from '../../domain/interfaces/usecaseInterface/user/IUserRegisterUsecase';
import { IOtpService } from '../../domain/interfaces/serviceInterface/otpServiceInterface';
import redis from '../../config/redis';
import { logger } from '../../infrastructure/logging/logger';


@injectable()
export class RegisterUsecase implements IUserRegisterUsecase {
    private Temp_USER_TTL = 600
    constructor(
        @inject("IUserRepository") private _userRepo: IUserRepository,
        @inject("IOtpService") private _otpService: IOtpService
    ) { }

    async execute(userData: RegisterDTO): Promise<boolean> {
        const existingUser = await this._userRepo.findByEmail(userData.email)

        if (existingUser) {
            throw new Error('user already exist with this email')
        }

        await this._otpService.sendOtp(userData.email)

        const tempUserKey = `tempUser:${userData.email}`
        await redis.set(tempUserKey, JSON.stringify(userData), "EX", this.Temp_USER_TTL)
        logger.info(` temporary userdata stored in redis for : ${userData.email}`)


        return true
    }
}




