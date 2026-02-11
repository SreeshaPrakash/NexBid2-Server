import { OtpService } from './../../application/services/otpService';

import { UserRepository } from "../../infrastructure/respository/UserRepository";
import { RegisterUsecase } from '../../application/usecases/userRegister.usecase';
import { UserController } from '../controllers/userController';
import { VerifyOtpUsecase } from '../../application/usecases/verifyOtpUsecase';
import { LoginUsecase } from '../../application/usecases/loginUsecase';
import { JwtService } from '../../application/services/jwtService';
import { ResendOtpUsecase } from '../../application/usecases/resendOtpUsecase';
import { GoogleLoginUsecase } from '../../application/usecases/googleLoginUsecase';
import { ForgotPasswordUsecase } from '../../application/usecases/forgotPasswordUsecase';
import { ResetPasswordUsecase } from '../../application/usecases/resetPasswordUsecase';
import { GoogleAuthService } from '../../application/services/googleAuthService';
import { RefreshTokenUsecase } from '../../application/usecases/refreshTokenUsecase';
import { jwt } from 'zod';



const userRepo = new UserRepository()

const otpService = new OtpService()
const jwtService = new JwtService()
const googleService = new GoogleAuthService()

const registerUsecase = new RegisterUsecase(userRepo , otpService)
const verifyOtpUsecase = new VerifyOtpUsecase(userRepo, otpService)
const loginUserUsecase = new LoginUsecase(userRepo, jwtService)
const resendOtpUsecase = new ResendOtpUsecase(userRepo, otpService)
const googleLoginUsecase = new GoogleLoginUsecase(googleService,userRepo ,jwtService )
const forgotPasswordUsecase = new ForgotPasswordUsecase(userRepo, otpService)
const resetPasswordUsecase = new ResetPasswordUsecase(userRepo, otpService)
const refreshToken = new RefreshTokenUsecase(jwtService , userRepo)


export const UserRegisterController  =  new UserController(
    registerUsecase,
    verifyOtpUsecase,
    loginUserUsecase,
    resendOtpUsecase,
    googleLoginUsecase,
    forgotPasswordUsecase,
    resetPasswordUsecase,
    refreshToken

    
)



