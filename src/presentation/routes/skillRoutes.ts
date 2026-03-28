import { Router } from "express";
import { skillController } from "../DI/User/Resolve";
import { authMiddleware } from "../middlewares/authMiddleware";

export class SkillRoutes {
    public skillRoutes = Router();

    constructor() {
        this.setRoutes();
    }

    private setRoutes(): void {
        this.skillRoutes.get("/", authMiddleware, (req, res) => skillController.getSkills(req, res));
    }
}
