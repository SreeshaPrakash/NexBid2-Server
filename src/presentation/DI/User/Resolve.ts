
import { container } from "tsyringe";
import { DIContainer } from "../DIContainer";

import { UserController } from "../../controllers/userController";
import { AdminController } from './../../controllers/Admin/AdminController';
import { AdminUserController } from "../../controllers/Admin/AdminUserController";
import { FreelancerProfileController } from "../../controllers/Freelancer/FreelancerProfileController";
import { ClientProfileController } from './../../controllers/Client/ClientProfileController';
import { AdminVerificationController } from './../../controllers/Admin/AdminVerificationController';
import { ProjectController } from "../../controllers/Project/ProjectController";
import { SkillController } from "../../controllers/SkillController";

DIContainer.init()

export const userController = container.resolve(UserController)

export const adminController = container.resolve(AdminController)

export const adminUserController = container.resolve(AdminUserController)

export const freelancerProfileController = container.resolve(FreelancerProfileController)

export const clientProfileController = container.resolve(ClientProfileController)

export const adminVerificationController = container.resolve(AdminVerificationController)

export const projectController = container.resolve(ProjectController)

export const skillController = container.resolve(SkillController)