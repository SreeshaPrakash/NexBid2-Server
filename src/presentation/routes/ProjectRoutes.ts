import { Router } from "express";
import { ProjectRoute } from "./constants";
import { projectController } from "../DI/User/Resolve";
import { authMiddleware } from "../middlewares/authMiddleware";
import { clientOnly, freelancerOnly, clientOrFreelancer } from "../middlewares/roleMiddleware";

export class ProjectRoutes {
    public projectRoutes = Router();

    constructor() {
        this.setRoutes();
    }

    private setRoutes(): void {

        this.projectRoutes.post(ProjectRoute.CREATE, authMiddleware, clientOnly, (req, res) =>
            projectController.createProject(req, res)
        );

        this.projectRoutes.get(ProjectRoute.GET_CLIENT_PROJECTS, authMiddleware, clientOnly, (req, res) =>
            projectController.getClientProjects(req, res)
        );

        // Get Open Public Projects (Freelancer Only)
        this.projectRoutes.get(ProjectRoute.GET_OPEN_PROJECTS, authMiddleware, freelancerOnly, (req, res) =>
            projectController.getOpenProjects(req, res)
        );

        // Get Project Details (Shared: Client or Freelancer)
        this.projectRoutes.get(
            ProjectRoute.GET_PROJECT_BY_ID,
            authMiddleware,
            clientOrFreelancer,
            (req, res) => projectController.getProjectById(req, res)
        );

        // Update Project (Client Only)
        this.projectRoutes.patch(
            ProjectRoute.UPDATE,
            authMiddleware,
            clientOnly,
            (req, res) => projectController.updateProject(req, res)
        );

        // Soft Delete Project (Client Only)
        this.projectRoutes.delete(
            ProjectRoute.DELETE,
            authMiddleware,
            clientOnly,
            (req, res) => projectController.deleteProject(req, res)
        );
    }
}
