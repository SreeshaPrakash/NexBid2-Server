import { LoginDTO, LoginResponse } from "../../../../application/dto/auth.dto";

export interface ILoginUsecase {
    execute(LoginData : LoginDTO) : Promise<LoginResponse>
}