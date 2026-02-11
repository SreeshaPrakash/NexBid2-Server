
export interface GoogleUserInfo {
    googleId : string
    email : string
    name : string
    isEmailVerified : boolean
}

export interface IGoogleAuthservice {
    verifyGoogleToken(idToken : string) : Promise<GoogleUserInfo> 
}