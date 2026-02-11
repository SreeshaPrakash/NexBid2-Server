import { ResetPasswordDTO } from "../../../../application/dto/auth.dto";

export interface IResetPasswordUsecase {
    execute(data : ResetPasswordDTO) : Promise<boolean>
}



