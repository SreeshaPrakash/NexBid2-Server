


export interface IOtpService {
    
    generateOtp( length : number) : string
    sendOtp(email : string) : Promise<void>
    verifyOtp(email: string, otp : string) : Promise<boolean>
    resendOtp(email : string) : Promise<void>
    
}


