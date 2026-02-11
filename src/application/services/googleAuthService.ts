
import { OAuth2Client } from "google-auth-library";
import { GoogleUserInfo, IGoogleAuthservice } from "../../domain/interfaces/serviceInterface/IGoogleAuthServiceInterface";
import { UnauthorizedError } from "../../shared/errorConstants";
import { logger } from "../../infrastructure/logging/logger";

export class GoogleAuthService implements IGoogleAuthservice {
    private client: OAuth2Client

    constructor() {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    }

    async verifyGoogleToken(idToken: string): Promise<GoogleUserInfo> {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            if (!payload) {
                throw new UnauthorizedError('Invalid google token')
            }
            const googleUserInfo: GoogleUserInfo = {
                googleId: payload.sub,
                email: payload.email || '',
                name: payload.name || '',
                isEmailVerified: payload.email_verified || false
            }
             logger.info(`google user verified :`, googleUserInfo.email)
            return googleUserInfo

        } catch (error) {
            // console.error(`Google token verification failed :`, error)
             logger.error(`Google token verification failed :`, error)
            throw new UnauthorizedError('Invalid Google token')
        }
    }
}