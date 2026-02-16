import { SwitchRoleResponse } from "../../../../application/dto/auth.dto";

export interface ISwitchRoleUsecase {
    execute(userId: string, requestedRole: string) : Promise<SwitchRoleResponse>
}