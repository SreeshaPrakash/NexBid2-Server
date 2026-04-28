import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../shared/httpStatusCode';

export const notFoundMiddleware = (req: Request, res: Response, _next: NextFunction) => {
    res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: `Can't find ${req.originalUrl} on this server!`
    });
};
