import { TokenPayload } from "../../../application/services/jwtService";
export interface IJwtService {
    generateAccessToken(payload:  Omit<TokenPayload, "type">) : string
    generateRefreshToken(payload : Omit<TokenPayload, "type">): string
    verifyAccessToken(token : string) : TokenPayload;
    verifyRefreshToken(token: string) : TokenPayload;
    
}