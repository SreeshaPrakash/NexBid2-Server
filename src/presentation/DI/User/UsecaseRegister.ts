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
import { UpdateclientProfileUsecase } from './../../../application/usecases/Client/UpdateClientProfileUsecase';
import { UpdateFreelancerProfileUsecase } from "../../../application/usecases/Freelancer/UpdateFreelancerProfileUsecase";
import { GetPendingVerificationsUsecase } from "../../../application/usecases/Admin/GetPendingVerificationsUsecase";
import { ApproveFreelancerVerificationUsecase } from "../../../application/usecases/Admin/ApproveFreelancerVerificationUsecase";
import { RejectFreelancerVerificationUsecase } from "../../../application/usecases/Admin/RejectFreelancerVerificationUsecase";
import { GetAdminFreelancerProfileUsecase } from "../../../application/usecases/Admin/GetAdminFreelancerProfileUsecase";
import { CreateProjectUsecase } from "../../../application/usecases/project/CreateProjectUsecase";
import { EditProjectUsecase } from "../../../application/usecases/project/EditProjectUsecase";
import { GetClientProjectsUsecase } from "../../../application/usecases/project/GetClientProjectsUsecase";
import { GetOpenProjectsUsecase } from "../../../application/usecases/project/GetOpenProjectsUsecase";
import { GetProjectByIdUsecase } from "../../../application/usecases/project/GetProjectByIdUsecase";
import { DeleteProjectUsecase } from "../../../application/usecases/project/DeleteProjectUsecase";
import { GetSkillsUsecase } from "../../../application/usecases/skill/GetSkillsUsecase";
import { GetClientDashboardStatsUsecase } from "../../../application/usecases/Client/GetClientDashboardStatsUsecase";
import { GetFreelancerDashboardStatsUsecase } from "../../../application/usecases/Freelancer/GetFreelancerDashboardStatsUsecase";
import { CreateBidUsecase } from "../../../application/usecases/bid/CreateBidUsecase";
import { GetBidsByProjectUsecase } from "../../../application/usecases/bid/GetBidsByProjectUsecase";
import { GetBidByFreelancerUsecase } from "../../../application/usecases/bid/GetBidByFreelancerUsecase";
import { UpdateBidUsecase } from "../../../application/usecases/bid/UpdateBidUsecase";
import { WithdrawBidUsecase } from "../../../application/usecases/bid/WithdrawBidUsecase";

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

        container.register("IGetPendingVerificationsUsecase", { useClass: GetPendingVerificationsUsecase })
        container.register("IApproveFreelancerVerificationUsecase", { useClass: ApproveFreelancerVerificationUsecase })
        container.register("IRejectFreelancerVerificationUsecase", { useClass: RejectFreelancerVerificationUsecase })
        container.register("IGetAdminFreelancerProfileUsecase", { useClass: GetAdminFreelancerProfileUsecase })


        container.register("IClientProfileUsecase", { useClass: ClientProfileUsecase })
        container.register("IUpdateClientProfileUsecase", { useClass: UpdateclientProfileUsecase })
        container.register("IUpdateFreelancerProfileUsecase", { useClass: UpdateFreelancerProfileUsecase })



        container.register("ICreateProjectUsecase", { useClass: CreateProjectUsecase })
        container.register("IGetClientProjectsUsecase", { useClass: GetClientProjectsUsecase })
        container.register("IGetOpenProjectsUsecase", { useClass: GetOpenProjectsUsecase })
        container.register("IGetProjectByIdUsecase", { useClass: GetProjectByIdUsecase })
        container.register("IEditProjectUsecase", { useClass: EditProjectUsecase })
        container.register("IDeleteProjectUsecase", { useClass: DeleteProjectUsecase })

        container.register("IGetSkillsUsecase", { useClass: GetSkillsUsecase })

        container.register("IGetClientDashboardStatsUsecase", { useClass: GetClientDashboardStatsUsecase })
        container.register("IGetFreelancerDashboardStatsUsecase", { useClass: GetFreelancerDashboardStatsUsecase })

        // Bid Usecases
        container.register("ICreateBidUsecase", { useClass: CreateBidUsecase })
        container.register("IGetBidsByProjectUsecase", { useClass: GetBidsByProjectUsecase })
        container.register("IGetBidByFreelancerUsecase", { useClass: GetBidByFreelancerUsecase })
        container.register("IUpdateBidUsecase", { useClass: UpdateBidUsecase })
        container.register("IWithdrawBidUsecase", { useClass: WithdrawBidUsecase })
    }
}





