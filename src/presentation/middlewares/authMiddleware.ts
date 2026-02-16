import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../application/services/jwtService";
import { UserRepository } from "../../infrastructure/respository/UserRepository";
import { UnauthorizedError } from "../../shared/errorConstants";
import { HttpStatusCode } from "../../shared/httpStatusCode";
import { MESSAGES } from "../../shared/messages";


declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                email: string;
                roles: string[]
                activeRole: string;
            }
        }
    }
}

const jwtService = new JwtService();
const userRepo = new UserRepository();


export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthorizedError('Token not provided')
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new UnauthorizedError("Invalid token format")
        }

        const decoded = jwtService.verifyAccessToken(token)

        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            roles: decoded.roles,
            activeRole: decoded.activeRole
        }

        const user = await userRepo.findById(decoded.userId)
        if (user?.isBlocked) {
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success: false,
                message: MESSAGES.USER_ACC_BLOCKED
            })
        }
        next();

    } catch (error: any) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            success: false,
            message: error.message || MESSAGES.AUTH_FAILED
        })
    }
}