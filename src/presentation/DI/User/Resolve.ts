
import { container } from "tsyringe";
import { DIContainer } from "../DIContainer";

import { UserController } from "../../controllers/userController";

DIContainer.init()

export const userController =  container.resolve(UserController)
