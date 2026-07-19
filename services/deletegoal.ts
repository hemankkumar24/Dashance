import { connectDB } from "@/lib/mongodb";
import Goal from "@/models/Goals";

export async function deleteGoal(
    goalId: string,
    userId: string
) {
    await connectDB();

    const goal = await Goal.findOneAndDelete({
        _id: goalId,
        userId,
    });

    if (!goal) {
        throw new Error("Goal not found.");
    }

    return {
        success: true,
    };
}