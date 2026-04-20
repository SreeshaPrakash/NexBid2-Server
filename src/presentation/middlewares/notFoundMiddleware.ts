import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../shared/httpStatusCode';

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`
    });
};
