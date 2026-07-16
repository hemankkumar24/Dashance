import mongoose, { Schema, model, models } from "mongoose";

export interface DashboardUser extends Document  {
    name: string;
    currentBalance: number;
    monthlyBudget: number;
    onboardingComplete: boolean;
}

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
        },
        name: {
            type: String,
            required: false,
        },
        currentBalance: {
            type: Number,
            required: false,
        },
        monthlyBudget: {
            type: Number,
        },
        onboardingComplete: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", userSchema);

export default User;