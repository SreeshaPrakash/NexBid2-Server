import { GetUserQueryDTO, userListResponse } from "../../../../application/dto/admin.dto";

export interface IGetAllUsersUsecase {
    getAllUsers(query : GetUserQueryDTO) : Promise<userListResponse>

    }

