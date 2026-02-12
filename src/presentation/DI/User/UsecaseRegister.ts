import { container } from "tsyringe";
import { RegisterUsecase } from "../../../application/usecases/userRegister.usecase";
import { VerifyOtpUsecase } from "../../../application/usecases/verifyOtpUsecase";
import { ResendOtpUsecase } from "../../../application/usecases/resendOtpUsecase";
import { LoginUsecase } from "../../../application/usecases/loginUsecase";
import { GoogleLoginUsecase } from "../../../application/usecases/googleLoginUsecase";
import { ForgotPasswordUsecase } from "../../../application/usecases/forgotPasswordUsecase";
import { ResetPasswordUsecase } from "../../../application/usecases/resetPasswordUsecase";
import { RefreshTokenUsecase } from "../../../application/usecases/refreshTokenUsecase";

export class UsecaseRegistrar {
    static registerUsecae() {

        container.register('IUserRegisterUsecase',{  useClass : RegisterUsecase })

        container.register("IVerifyOtpUsecase", { useClass : VerifyOtpUsecase})

        container.register("IResendOtpusecase", { useClass : ResendOtpUsecase})

        container.register("ILoginUsecase", { useClass : LoginUsecase})

        container.register("IGoogleLoginUsecase", { useClass : GoogleLoginUsecase})

        container.register("IForgotPasswordUsecase", { useClass : ForgotPasswordUsecase})

        container.register("IResetPasswordUsecase", { useClass : ResetPasswordUsecase})

        container.register("IRefreshTokenUsecase", { useClass : RefreshTokenUsecase})








    }
}