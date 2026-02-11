
import { RegisterDTO } from '../../../../application/dto/auth.dto';
export interface IUserRegisterUsecase{
    execute(userData : RegisterDTO) : Promise<boolean>
}
