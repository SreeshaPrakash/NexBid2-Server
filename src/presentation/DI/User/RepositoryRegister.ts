
import { container } from "tsyringe";
import { UserRepository } from "../../../infrastructure/respository/UserRepository";
import { FreelancerRepository } from "../../../infrastructure/respository/FreelancerRepository";
export class RepositoryRegistrar {
    static registerRepository() {
        container.register('IUserRepository',{
            useClass : UserRepository
        })

        container.register("IFreelancerRepository", {
            useClass : FreelancerRepository
        })
    }
}