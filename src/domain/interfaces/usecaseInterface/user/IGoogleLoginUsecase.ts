import { GoogleLoginResponse } from "../../../../application/dto/auth.dto";

export interface IGoogleLoginUsecase {
    execute(idToken: string) : Promise<GoogleLoginResponse>
}

