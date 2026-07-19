import { connectDB } from "@/lib/mongodb";
import Goal from "@/models/Goals";

interface CreateGoalParams {
    userId: string;
    title: string;
    icon?: string;
    targetAmount: number;
}

export async function createGoal({
    userId,
    title,
    icon = "Target",
    targetAmount,
}: CreateGoalParams) {
    await connectDB();

    const goal = await Goal.create({
        userId,
        title,
        icon,
        targetAmount,
        currentAmount: 0,
        archived: false,
    });

    return {
        id: goal._id.toString(),
        title: goal.title,
        icon: goal.icon,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        archived: goal.archived,
        createdAt: goal.createdAt,
    };
}