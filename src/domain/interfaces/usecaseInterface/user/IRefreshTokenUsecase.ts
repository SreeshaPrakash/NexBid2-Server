import { RefreshTokenResponse } from "../../../../application/dto/auth.dto";

export interface IRefreshTokenUsecase {
    execute(refreshToken : string) : Promise<RefreshTokenResponse>
}