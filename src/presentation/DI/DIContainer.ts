
import { ServiceRegistrar } from "./User/ServiceRegister";
import { RepositoryRegistrar } from "./User/RepositoryRegister";
import { UsecaseRegistrar } from './User/UsecaseRegister';


export class DIContainer {
    static init() {
        RepositoryRegistrar.registerRepository();
        ServiceRegistrar.registerService();
        UsecaseRegistrar.registerUsecae();
    }
}