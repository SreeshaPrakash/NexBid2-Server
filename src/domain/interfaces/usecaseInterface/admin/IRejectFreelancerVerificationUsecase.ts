
export interface IRejectFreelancerVerificationUsecase {
    execute(freelancerId : string, reason : string) : Promise <void>
}

