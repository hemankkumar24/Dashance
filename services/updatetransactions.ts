import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Goal from "@/models/Goals";
import Transaction from "@/models/Transactions";

interface UpdateTransactionInput {
    userId: string;
    title: string;
    transactionId: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    goalId?: string | null;
    createdAt?: Date;
}

export async function updateTransaction({
    userId,
    title,
    transactionId,
    amount,
    type,
    category,
    goalId,
    createdAt,
}: UpdateTransactionInput) {
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

        if (transaction.type === "income") {
            user.currentBalance -= transaction.amount;
        } else {
            user.currentBalance += transaction.amount;
        }

        if (transaction.goalId) {
            const oldGoal = await Goal.findById(transaction.goalId).session(session);

            if (oldGoal) {
                oldGoal.currentAmount -= transaction.amount;

                if (oldGoal.currentAmount < 0) {
                    oldGoal.currentAmount = 0;
                }

                await oldGoal.save({ session });
            }
        }

        transaction.title = title;
        transaction.amount = amount;
        transaction.type = type;
        transaction.category = category;
        transaction.goalId = goalId ? new mongoose.Types.ObjectId(goalId) : undefined;
        
        if (createdAt) {
            await Transaction.updateOne(
                {
                    _id: transactionId,
                    userId,
                },
                {
                    $set: {
                        createdAt,
                    },
                },
                {
                    session,
                    timestamps: false,
                    overwriteImmutable: true,
                }
            );
        }

        if (type === "income") {
            user.currentBalance += amount;
        } else {
            user.currentBalance -= amount;
        }      
        
        if (goalId) {
            const newGoal = await Goal.findById(goalId).session(session);

            if (!newGoal) {
                throw new Error("Goal not found.");
            }

            newGoal.currentAmount += amount;

            await newGoal.save({ session });
        }

        await user.save({ session });
        await transaction.save({ session });

        const updatedTransaction = await Transaction.findById(transaction._id).session(session);
        
        await session.commitTransaction();

        return updatedTransaction;  
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}