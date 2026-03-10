import { container } from "tsyringe";
import { RegisterUsecase } from "../../../application/usecases/userRegister.usecase";
import { VerifyOtpUsecase } from "../../../application/usecases/verifyOtpUsecase";
import { ResendOtpUsecase } from "../../../application/usecases/resendOtpUsecase";
import { LoginUsecase } from "../../../application/usecases/loginUsecase";
import { GoogleLoginUsecase } from "../../../application/usecases/googleLoginUsecase";
import { ForgotPasswordUsecase } from "../../../application/usecases/forgotPasswordUsecase";
import { ResetPasswordUsecase } from "../../../application/usecases/resetPasswordUsecase";
import { RefreshTokenUsecase } from "../../../application/usecases/refreshTokenUsecase";
import { SwitchRoleusecase } from "../../../application/usecases/switchRoleUsecase";
import { AdminLoginUsecase } from "../../../application/usecases/Admin/AdminLoginUsecase";
import { GetAllUsersUsecase } from "../../../application/usecases/Admin/getAllUsers";
import { GetUserByIdUsecase } from "../../../application/usecases/Admin/GetUserByIdUsecase";
import { UpdateUserStatusUsecase } from "../../../application/usecases/Admin/UpdateUserStatusUsecase";
import { CreateFreelancerProfileUsecase } from "../../../application/usecases/Freelancer/CreateFreelancerProfileUsecase";
import { FreelancerProfileUsecase } from "../../../application/usecases/Freelancer/FreelancerProfileUsecase";
import { RequestFreelancerVerificationUsecase } from "../../../application/usecases/Freelancer/RequestFreelancerVerificationUsecase";
import { LogoutUsecase } from "../../../application/usecases/logoutUsecase";


import { ClientProfileUsecase } from './../../../application/usecases/Client/clientProfileUsecase';
import { UpdateFreelancerProfileUsecase } from "../../../application/usecases/Freelancer/UpdateFreelancerProfileUsecase";

export class UsecaseRegistrar {
    static registerUsecase() {

        container.register('IUserRegisterUsecase', { useClass: RegisterUsecase })

        container.register("IVerifyOtpUsecase", { useClass: VerifyOtpUsecase })

        container.register("IResendOtpusecase", { useClass: ResendOtpUsecase })

        container.register("ILoginUsecase", { useClass: LoginUsecase })

        container.register("IGoogleLoginUsecase", { useClass: GoogleLoginUsecase })

        container.register("IForgotPasswordUsecase", { useClass: ForgotPasswordUsecase })

        container.register("IResetPasswordUsecase", { useClass: ResetPasswordUsecase })

        container.register("IRefreshTokenUsecase", { useClass: RefreshTokenUsecase })

        container.register("ISwitchRoleUsecase", { useClass: SwitchRoleusecase })

        container.register("IAdminLoginUsecase", { useClass: AdminLoginUsecase })

        container.register("IGetAllUsersUsecase", { useClass: GetAllUsersUsecase })

        container.register("IGetUserByIdUsecase", { useClass: GetUserByIdUsecase })

        container.register("IUpdateUserStatusUsecase", { useClass: UpdateUserStatusUsecase })

        container.register("ICreateFreelancerProfileUsecase", { useClass: CreateFreelancerProfileUsecase })

        container.register("IGetFreelancerUsecase", { useClass: FreelancerProfileUsecase })

        container.register("IRequestFreelancerVerificationUsecase", { useClass: RequestFreelancerVerificationUsecase })

        container.register("ILogoutUsecase", { useClass: LogoutUsecase })



        container.register("IClientProfileUsecase",{ useClass : ClientProfileUsecase })
        container.register("IUpdateFreelancerProfileUsecase", {useClass : UpdateFreelancerProfileUsecase})

    }
}