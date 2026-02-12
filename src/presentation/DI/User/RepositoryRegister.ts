
import { container } from "tsyringe";
import { UserRepository } from "../../../infrastructure/respository/UserRepository";

export class RepositoryRegistrar {
    static registerRepository() {
        container.register('IUserRepository',{
            useClass : UserRepository
        })
    }
}