
import { container } from "tsyringe";
import { DIContainer } from "../DIContainer";

import { UserController } from "../../controllers/userController";
import { AdminController } from './../../controllers/Admin/AdminController';
import { AdminUserController } from "../../controllers/Admin/AdminUserController";
import { FreelancerProfileController } from "../../controllers/Freelancer/FreelancerProfileController";
import { ClientProfileController } from './../../controllers/Client/ClientProfileController';


DIContainer.init()

export const userController = container.resolve(UserController)

export const adminController = container.resolve(AdminController)

export const adminUserController = container.resolve(AdminUserController)

export const freelancerProfileController = container.resolve(FreelancerProfileController)

export const clientProfileController = container.resolve(ClientProfileController)