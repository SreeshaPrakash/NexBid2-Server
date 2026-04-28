import { User } from "./User";

export interface Freelancer extends User {
    id: string
    userId: string
    title: string
    bio: string
    skills: string[]

    experienceInYears: number
    experiences: { title: string, description: string }[]
    portfolio ?: string
    previousWorks ?: string[]

    gitHubUrl?: string
    linkedinUrl?: string
    rating: number
    totalReviews: number
    completedProjects: number
    verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected',
    rejectionReason?: string
    
    isActive: boolean,
    createdAt: Date
    updatedAt: Date

}








