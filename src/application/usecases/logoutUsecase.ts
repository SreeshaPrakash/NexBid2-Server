import { injectable } from 'tsyringe';
import { ILogoutUsecase } from '../../domain/interfaces/usecaseInterface/user/ILogoutUsecase';

@injectable()
export class LogoutUsecase implements ILogoutUsecase {
    async execute(): Promise<void> {
        return;
    }
}
