import { injectable } from "tsyringe";

import { OAuth2Client } from "google-auth-library";
import { GoogleUserInfo, IGoogleAuthservice } from "../../domain/interfaces/serviceInterface/IGoogleAuthServiceInterface";
import { UnauthorizedError } from "../../shared/errorConstants";
import { logger } from "../../infrastructure/logging/logger";

@injectable()
export class GoogleAuthService implements IGoogleAuthservice {
    private client: OAuth2Client

    constructor() {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    }

    async verifyGoogleToken(token: string): Promise<GoogleUserInfo> {
        try {
            try {
                const ticket = await this.client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID
                })

                const payload = ticket.getPayload()

                if (payload) {
                    const googleUserInfo: GoogleUserInfo = {
                        googleId: payload.sub,
                        email: payload.email || '',
                        name: payload.name || '',
                        isEmailVerified: payload.email_verified || false
                    }
                    logger.info(`Google ID token verified:`, googleUserInfo.email)
                    return googleUserInfo
                }
            } catch {
                logger.info(`ID token verification failed, trying as access token...`)
            }

            this.client.setCredentials({ access_token: token });
            const response = await this.client.request<any>({
                url: 'https://www.googleapis.com/oauth2/v3/userinfo'
            });

            const payload = response.data;

            if (!payload) {
                throw new UnauthorizedError('Invalid google token')
            }

            const googleUserInfo: GoogleUserInfo = {
                googleId: payload.sub,
                email: payload.email || '',
                name: payload.name || '',
                isEmailVerified: payload.email_verified || false
            }
            logger.info(`Google access token verified:`, googleUserInfo.email)
            return googleUserInfo

        } catch (error) {
            logger.error(`Google token verification failed:`, error)
            throw new UnauthorizedError('Invalid Google token')
        }
    }
}