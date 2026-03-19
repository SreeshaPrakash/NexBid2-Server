
export interface IApproveFreelancerVerificationUsecase {
    execute(freelancerId: string): Promise<void>;
}


