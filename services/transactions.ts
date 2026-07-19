import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

import Transaction from "@/models/Transactions";
import User from "@/models/User";
import Goal from "@/models/Goals";

interface addTransactionInput {
    userId: string;
    title: string;
    amount: number;
    category: string;
    type: "income" | "expense";
    goalId?: string | undefined;
    createdAt?: Date;
}

interface GetTransactionsInput {
    userId: string;
    page: number;
    limit: number;
}

// for infinite scrolling
export async function getTransactions({
    userId,
    page,
    limit,
}: GetTransactionsInput) {

    await connectDB();

    const transactions = await Transaction.find({
        userId,
    })
        .sort({
            createdAt: -1,
        })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Transaction.countDocuments({
        userId,
    });

    return {
        transactions,
        hasMore: page * limit < total,
    };
}

export async function addTransaction({ userId, title, amount, category, type, goalId, createdAt }: addTransactionInput) {

    await connectDB();
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const user = await User.findById(userId).session(session);

        if (!user) {
            throw new Error("User not found.");
        }
        const transaction = await Transaction.create(
            [
                {
                    userId,
                    title,
                    amount,
                    category,
                    type,
                    goalId: goalId || undefined,
                    createdAt: createdAt ?? new Date(),
                },
            ],
            { session }
        );

        // Update balance
        if (type === "income") {
            user.currentBalance += amount;
        } else {
            user.currentBalance -= amount;
        }

        await user.save({ session });

        // Update goal if linked
        if (goalId) {
            const goal = await Goal.findById(goalId).session(session);

            if (!goal) {
                throw new Error("Goal not found.");
            }

            if (type === "income") {
                goal.currentAmount += amount;
            } else {
                if (goal.currentAmount < amount) {
                    throw new Error("Insufficient funds in goal.");
                }
                goal.currentAmount -= amount;
            }

            await goal.save({ session });
        }

        await session.commitTransaction();

        return {
            id: transaction[0]._id.toString(),
            title: transaction[0].title,
            amount: transaction[0].amount,
            category: transaction[0].category,
            type: transaction[0].type,
            goalId: transaction[0].goalId,
            createdAt: transaction[0].createdAt,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}
