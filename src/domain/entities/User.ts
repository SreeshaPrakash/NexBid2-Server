export type UserRole = 'admin' | 'client'  | 'freelancer'

export interface User {
    id : string;
    name : string
    email : string
    password ?: string
    googleId ?: string
    phone ?: number
    roles ?: UserRole[]
    profileImage ?: string
    isEmailVerified : boolean
    isBlocked : boolean

    // location ?: string
    // timezone ?: string
    // description ?: string
    createdAt ?: Date
    updatedAt ?: Date

}