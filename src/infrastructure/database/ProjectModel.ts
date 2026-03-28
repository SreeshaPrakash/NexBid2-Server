import mongoose, { Schema, Document } from "mongoose";
import { ProjectStatus, ProjectVisibility } from './../../shared/projectConstants';

export interface IProject extends Document {
    clientId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    budget: number;
    deadline?: Date | null;
    biddingDeadline: Date;
    attachments: string[];
    skillsRequired: string[];
    projectStatus: ProjectStatus;
    visibility: ProjectVisibility;
    selectedFreelancer: mongoose.Types.ObjectId | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        budget: {
            type: Number,
            required: true
        },
        deadline: {
            type: Date,
            required: false,
            default: null
        },
        biddingDeadline: {
            type: Date,
            required: true
        },
        attachments: {
            type: [String],
            default: []
        },
        skillsRequired: {
            type: [String],
            default: []
        },
        projectStatus: {
            type: String,
            enum: Object.values(ProjectStatus),
            default: ProjectStatus.OPEN
        },
        visibility: {
            type: String,
            enum: Object.values(ProjectVisibility),
            default: ProjectVisibility.PUBLIC
        },
        selectedFreelancer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
