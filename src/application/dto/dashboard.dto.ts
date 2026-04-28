export interface ClientDashboardStats {
    activeProjectsCount: number;
    totalBidsCount: number;
    hiredTalentsCount: number;
    totalSpent: number;
}

export interface FreelancerDashboardStats {
    totalBidsPlaced: number;
    ongoingProjectsCount: number;
    completedProjectsCount: number;
    totalEarnings: number;
    recommendedProjects: any[];
}
