import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
    name: string;
}

const SkillSchema = new Schema<ISkill>({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

export const SkillModel = mongoose.model<ISkill>("Skill", SkillSchema);
