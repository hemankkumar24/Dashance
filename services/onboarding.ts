import { connectDB } from "@/lib/mongodb";
import User from "@/models/User"
import { NextResponse } from "next/server";
interface OnboardingInput {
    name: string;
    balance: number;
    budget: number;
}

export async function completeOnboarding(
    userId: string,
    {
        name, balance, budget
    }: OnboardingInput) {
    await connectDB();

    const user = await User.findByIdAndUpdate(
        userId,
        {
            name: name,
            currentBalance: balance,
            monthlyBudget: budget,
            onboardingComplete: true,
        },
        { new: true }
    );

    return user;

}