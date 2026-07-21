import { connectDB } from "@/lib/mongodb";
import Goal from "@/models/Goals";

interface UpdateGoalParams {
    goalId: string;
    userId: string;
    title: string;
    icon: string;
    targetAmount: number;
}

export async function updateGoal({
    goalId,
    userId,
    title,
    icon,
    targetAmount,
}: UpdateGoalParams) {
    await connectDB();

    const goal = await Goal.findOne({
        _id: goalId,
        userId,
    });

    if (!goal) {
        throw new Error("Goal not found.");
    }

    if (targetAmount < goal.currentAmount) {
        throw new Error(
            "Target amount cannot be less than the current saved amount."
        );
    }

    goal.title = title;
    goal.icon = icon;
    goal.targetAmount = targetAmount;

    if (goal.currentAmount < goal.targetAmount) {
        goal.archived = false;
    }

    await goal.save();

    return {
        id: goal._id.toString(),
        title: goal.title,
        icon: goal.icon,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        archived: goal.archived,
    };
}