
export interface AdminUserListDto {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isVerified: boolean;
    isBlocked: boolean;
    createdAt: Date;
}

export interface AdminLoginResponse {
    user: {
        id: string;
        email: string;
        name: string;
        roles: string[];
        activeRole: string;
        isEmailVerified: boolean;
    },
    accessToken: string;
    refreshToken: string;
}

export interface GetUserQueryDTO {
    page?: number;
    limit?: number;
    search?: string
    role?: string
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}


export interface userListResponse {
    users: AdminUserListDto[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalUsers: number;
        limit: number;
    };
    stats?: {
        total: number;
        active: number;
        blocked: number;
        clients: number;
        freelancers: number;
    };
}
