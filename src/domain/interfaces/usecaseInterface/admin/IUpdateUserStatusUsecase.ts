

export interface IUpdateUserStatusUsecase {
    
    toggleBlockStatus(userId: string, isBlocked: boolean): Promise<boolean>
}


