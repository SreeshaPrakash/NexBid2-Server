    export type UserRole = 'admin' | 'client'  | 'freelancer'

    export interface User {
        id : string;
        name : string
        email : string
        password ?: string
        googleId ?: string
        phone ?: string
        roles ?: UserRole[]
        country ?: string          //doubt if needed
        state ?: string            //doubt if needed
        profileImage ?: string
        isEmailVerified : boolean
        isBlocked : boolean
        createdAt ?: Date
        updatedAt ?: Date

    }


