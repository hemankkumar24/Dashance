import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Transaction from "@/models/Transactions";
import Goal from "@/models/Goals";

export async function getUserData(userId: string) {
    await connectDB();

    const [user, transactions, goals] = await Promise.all([
        User.findById(userId),
        Transaction.find({ userId }).sort({ createdAt: -1 }),
        Goal.find({ userId }),
    ]);

    if (!user) {
        throw new Error("User not found.");
    }

    return {
        user,
        transactions,
        goals,
    };
}