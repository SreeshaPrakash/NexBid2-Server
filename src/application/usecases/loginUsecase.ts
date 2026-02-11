
import { IUserRepository } from "../../domain/interfaces/repositoryInterface/user/IUserRepository";
import { IJwtService } from "../../domain/interfaces/serviceInterface/jwtServiceInterface";
import { ILoginUsecase } from "../../domain/interfaces/usecaseInterface/user/ILoginUsecase";
import { UnauthorizedError, ValidationError } from "../../shared/errorConstants";
import { UserRole } from "../../shared/roles";
import { LoginDTO, LoginResponse } from "../dto/auth.dto";
import bcrypt from "bcrypt";

export class LoginUsecase implements ILoginUsecase {

    constructor (
        private _userRepo : IUserRepository,
        private _jwtService : IJwtService
    ) {}

    async execute(LoginData: LoginDTO): Promise<LoginResponse> {
        const {email, password} = LoginData

         if(!email || !password){
            throw new ValidationError('Email and Password required')
         }

         const user = await this._userRepo.findByEmail(email)
         if(!user){
            throw new UnauthorizedError('Invalid email or password')
         }

         if(user.isBlocked){
            throw new UnauthorizedError('Your account has been blocked')
         }

         if(!user.password){
            throw new UnauthorizedError('invalid login method, login with google')
         }

         const isPasswordValild = await bcrypt.compare(password , user.password)

         if(!isPasswordValild) {
            throw new UnauthorizedError('Invalid email or password')
         }

         const roles = user.roles || [UserRole.CLIENT]

         const activeRole = UserRole.CLIENT 

         const tokenPayload = {
            userId : user.id,
            email : user.email,
            roles,
            activeRole
         }

         const accessToken = this._jwtService.generateAccessToken(tokenPayload)
         const refreshToken = this._jwtService.generateRefreshToken(tokenPayload)

         return {
            user :{
                id : user.id,
                email : user.email,
                name : user.name,
                roles : user.roles || [UserRole.CLIENT],
                isEmailVerified : user.isEmailVerified || false
            },
            accessToken,
            refreshToken
         }

    }
}