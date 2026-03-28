import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { HttpStatusCode } from '../../shared/httpStatusCode';

export const validateRequest = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Validation failed",
                    errors: error.issues.map(issue => ({
                        path: issue.path.join('.'),
                        message: issue.message
                    }))
                });
            }
            next(error);
        }
    };
};
