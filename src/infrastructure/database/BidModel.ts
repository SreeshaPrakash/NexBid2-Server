import mongoose, { Schema, Document } from "mongoose";

export interface IBid extends Document {
    projectId: mongoose.Types.ObjectId;
    freelancerId: mongoose.Types.ObjectId;
    bidAmount: number;
    deliveryTime: number;
    message: string;
    status: 'active' | 'withdrawn' | 'accepted' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const BidSchema = new Schema<IBid>(
    {
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },
        freelancerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        bidAmount: {
            type: Number,
            required: true
        },
        deliveryTime: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'withdrawn', 'accepted', 'rejected'],
            default: 'active'
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

BidSchema.virtual('freelancerProfile', {
    ref: 'Freelancer',
    localField: 'freelancerId',
    foreignField: 'userId',
    justOne: true
});

export const BidModel = mongoose.model<IBid>("Bid", BidSchema);
