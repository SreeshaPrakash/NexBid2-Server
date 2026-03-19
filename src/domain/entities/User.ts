    export type UserRole = 'admin' | 'client'  | 'freelancer'

    export interface User {
        id : string;
        name : string
        email : string
        password ?: string
        googleId ?: string
        phone ?: string
        roles ?: UserRole[]
        country ?: string          
        state ?: string            
        profileImage ?: string
        isEmailVerified : boolean
        isBlocked : boolean
        createdAt ?: Date
        updatedAt ?: Date

    }


