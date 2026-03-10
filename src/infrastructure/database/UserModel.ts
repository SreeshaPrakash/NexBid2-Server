

import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        googleId: { type: String },
        roles: { type: [String], default: ['client'] },
        phone: { type: String },
        country: { type : String},
        state : { type : String},
        profileImage : { type : String},
        isEmailVerified: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false }

    },
    {
        timestamps: true
    }
)

export const userModel = mongoose.model("User", UserSchema)



