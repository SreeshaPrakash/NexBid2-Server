import { ClientDashboardStats } from "../../../../application/dto/dashboard.dto";

export interface IGetClientDashboardStatsUsecase {
    execute(clientId: string): Promise<ClientDashboardStats>;
}
