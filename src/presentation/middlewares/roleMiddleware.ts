
import { HttpStatusCode } from "../../shared/httpStatusCode"
import { Request, Response, NextFunction } from "express"
import { MESSAGES } from "../../shared/messages"


export const roleMiddleware  =  ( allowedRoles  : string[] ) => {

    return async(req : Request , res : Response , next : NextFunction) => {
        if(!req.user){
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                success: false,
                message : MESSAGES.AUTH_REQUIRED
            })
        }
        const activeRole = req.user.activeRole

        if(!activeRole || !allowedRoles.includes(activeRole)){
            return res.status(HttpStatusCode.FORBIDDEN).json({
                success  : false,
                message : MESSAGES.ACCESS_FORBIDDEN || "access not provide for this user role"
            })
        }

        next();

    }
}

export const adminOnly = roleMiddleware(['admin'])
export const freelancerOnly = roleMiddleware(['freelancer'])
export const clientOnly = roleMiddleware(['client'])
export const clientOrFreelancer = roleMiddleware(['freelancer', 'client'])

