import mongoose, { Schema } from "mongoose";

export interface IFreelancer extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    bio: string;
    skills: string[]
    experienceInYears: number
    experiences: { title: string, description: string }[]
    rating: number
    totalReviews: number
    completedProjects: number
    gitHubUrl?: string
    linkedinUrl?: string
    portfolio?: string
    previousWorks?: string[]
    isActive: boolean
    verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
    rejectionReason?: string
    createdAt: Date
    updatedAt: Date
}


const FreelancerSchema = new Schema<IFreelancer>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        experienceInYears: {
            type: Number,
            default: 0,
        },
        experiences: [{
            title: { type: String, required: true },
            description: { type: String, required: true }
        }],
        rating: {
            type: Number,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
        completedProjects: {
            type: Number,
            default: 0,
        },
        gitHubUrl: {
            type: String,
        },
        linkedinUrl: {
            type: String,
        },
        portfolio: {
            type: String,
        },
        previousWorks: {
            type: [String],
            default: [],
        },
        verificationStatus: {
            type: String,
            enum: ['unverified', 'pending', 'verified', 'rejected'],
            default: 'unverified',
        },
        rejectionReason: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    }, {
    timestamps: true
}
)


export const FreelancerModel = mongoose.model<IFreelancer>(
    'Freelancer', FreelancerSchema
)