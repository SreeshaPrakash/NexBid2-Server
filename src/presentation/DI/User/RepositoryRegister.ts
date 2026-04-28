
import { container } from "tsyringe";
import { UserRepository } from "../../../infrastructure/respository/UserRepository";
import { FreelancerRepository } from "../../../infrastructure/respository/FreelancerRepository";
import { ProjectRepository } from "../../../infrastructure/respository/ProjectRepository";
import { SkillRepository } from "../../../infrastructure/respository/SkillRepository";
import { BidRepository } from "../../../infrastructure/respository/BidRepository";

export class RepositoryRegistrar {
    static registerRepository() {
        container.register('IUserRepository',{
            useClass : UserRepository
        })

        container.register("IFreelancerRepository", {
            useClass : FreelancerRepository
        })

        container.register("IProjectRepository", {
            useClass: ProjectRepository
        })

        container.register("ISkillRepository", {
            useClass: SkillRepository
        })

        container.register("IBidRepository", {
            useClass: BidRepository
        })
    }
}