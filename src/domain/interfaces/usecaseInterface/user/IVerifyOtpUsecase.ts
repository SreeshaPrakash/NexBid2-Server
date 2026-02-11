
import { VerifyOtpDTO, VerifyOtpResponse } from "../../../../application/dto/auth.dto"

export interface IVerifyOtpUsecase {
    execute(verifyData: VerifyOtpDTO) : Promise<VerifyOtpResponse>
}


