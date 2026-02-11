import { User } from "./User";

export interface Freelancer extends User {
    id : string
    userId : string
    title : string
    bio : string
    skills : string
    rating : number
    totalReview : number
    completedProjects : number  
    status : 'unverified' | 'pending' | 'verified' | 'rejected'
    rejectionReason : string
    gitHubUrl : string
    linkedinUrl : string
    createdAt : Date
    updatedAt : Date

}


