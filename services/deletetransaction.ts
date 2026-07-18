import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Goal from "@/models/Goals";
import Transaction from "@/models/Transactions";

interface DeleteTransactionInput {
    userId: string;
    transactionId: string;
}

export async function deleteTransaction({
    userId,
    transactionId,
}: DeleteTransactionInput) {
    await connectDB();

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const transaction = await Transaction.findOne({
            _id: transactionId,
            userId,
        }).session(session);

        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        const user = await User.findById(userId).session(session);

        if (!user) {
            throw new Error("User not found.");
        }

        // Reverse balance
        if (transaction.type === "income") {
            user.currentBalance -= transaction.amount;
        } else {
            user.currentBalance += transaction.amount;
        }

        await user.save({ session });

        // Reverse goal contribution
        if (transaction.goalId) {
            const goal = await Goal.findById(transaction.goalId).session(session);

            if (goal) {
                goal.currentAmount -= transaction.amount;

                // Prevent negative values
                if (goal.currentAmount < 0) {
                    goal.currentAmount = 0;
                }

                await goal.save({ session });
            }
        }

        await Transaction.findByIdAndDelete(transactionId).session(session);

        await session.commitTransaction();

        return {
            success: true,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}