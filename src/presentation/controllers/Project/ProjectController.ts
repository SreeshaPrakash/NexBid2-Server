import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { HttpStatusCode } from '../../../shared/httpStatusCode';
import { ICreateProjectUsecase } from '../../../domain/interfaces/usecaseInterface/project/ICreateProjectUsecase';
import { IGetClientProjectsUsecase } from '../../../domain/interfaces/usecaseInterface/project/IGetClientProjectsUsecase';
import { IGetOpenProjectsUsecase } from '../../../domain/interfaces/usecaseInterface/project/IGetOpenProjectsUsecase';
import { IGetProjectByIdUsecase } from '../../../domain/interfaces/usecaseInterface/project/IGetProjectByIdUsecase';
import { IEditProjectUsecase } from '../../../domain/interfaces/usecaseInterface/project/IEditProjectUsecase';
import { IDeleteProjectUsecase } from '../../../domain/interfaces/usecaseInterface/project/IDeleteProjectUsecase';
import { AppError } from '../../../shared/errorConstants';

@injectable()
export class ProjectController {
    constructor(
        @inject("ICreateProjectUsecase") private _createProjectUsecase: ICreateProjectUsecase,
        @inject("IGetClientProjectsUsecase") private _getClientProjectsUsecase: IGetClientProjectsUsecase,
        @inject("IGetOpenProjectsUsecase") private _getOpenProjectsUsecase: IGetOpenProjectsUsecase,
        @inject("IGetProjectByIdUsecase") private _getProjectByIdUsecase: IGetProjectByIdUsecase,
        @inject("IEditProjectUsecase") private _editProjectUsecase: IEditProjectUsecase,
        @inject("IDeleteProjectUsecase") private _deleteProjectUsecase: IDeleteProjectUsecase
    ) { }

    createProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const clientId = req.user!.userId;
            const project = await this._createProjectUsecase.execute({ ...req.body, clientId });
            res.status(HttpStatusCode.CREATED).json({ success: true, project });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    getClientProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const clientId = req.user!.userId;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 4;
            const status = req.query.status as string;
            const { projects, total } = await this._getClientProjectsUsecase.execute(clientId, page, limit, status as any);
            res.status(HttpStatusCode.OK).json({ success: true, projects, total, debugLimit: limit });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    getOpenProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 4;
            const { projects, total } = await this._getOpenProjectsUsecase.execute(userId, page, limit);
            res.status(HttpStatusCode.OK).json({ success: true, projects, total, debugLimit: limit });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    getProjectById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params as { projectId: string };
            const { userId, activeRole } = req.user!;

            // Cast activeRole to the specific union type required by the use case
            const userRole = activeRole as "client" | "freelancer";

            const project = await this._getProjectByIdUsecase.execute({ projectId, userId, userRole });
            res.status(HttpStatusCode.OK).json({ success: true, project });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    updateProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params as { projectId: string };
            const clientId = req.user!.userId;
            const project = await this._editProjectUsecase.execute({ ...req.body, projectId, clientId });
            res.status(HttpStatusCode.OK).json({ success: true, project });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    deleteProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params as { projectId: string };
            const clientId = req.user!.userId;
            await this._deleteProjectUsecase.execute({ projectId, clientId });
            res.status(HttpStatusCode.OK).json({ success: true, message: "Project deleted successfully" });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    extendProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const { projectId } = req.params as { projectId: string };
            const clientId = req.user!.userId;
            const project = await this._editProjectUsecase.execute({ projectId, clientId, isExtension: true } as any);
            res.status(HttpStatusCode.OK).json({ success: true, project, message: "Project extended successfully" });
        } catch (err) {
            this.handleError(res, err as Error);
        }
    }

    private handleError(res: Response, error: Error): void {
        const appError = error as AppError;
        if (appError.statusCode) {
            res.status(appError.statusCode).json({ success: false, message: appError.message });
        } else {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message || "Internal Server Error" });
        }
    }
}
