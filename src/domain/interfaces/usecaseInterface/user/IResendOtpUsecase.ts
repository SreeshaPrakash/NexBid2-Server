
export interface IResendOtpusecase {
    execute(email:string ) : Promise<boolean>
}