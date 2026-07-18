import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function updateBudget(
    userId: string,
    newBudget: number
) {
    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            monthlyBudget: newBudget,
        },
        {
            new: true,
        }
    );

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser?.monthlyBudget;;
}