import { AdminLoginResponse } from "../../../../application/dto/admin.dto";
import { LoginDTO } from "../../../../application/dto/auth.dto";

export interface IAdminLoginUsecase {
    execute(loginData : LoginDTO): Promise<AdminLoginResponse>
}