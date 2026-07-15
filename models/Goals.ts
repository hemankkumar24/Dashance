import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGoal extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    icon: string;
    targetAmount: number;
    currentAmount: number;
    archived: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const goalSchema = new Schema<IGoal>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        icon: {
            type: String,
            default: "Target",
        },

        targetAmount: {
            type: Number,
            required: true,
            min: 1,
        },

        currentAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        archived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Goal: Model<IGoal> =
    mongoose.models.Goal ||
    mongoose.model<IGoal>("Goal", goalSchema);

export default Goal;