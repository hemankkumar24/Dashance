import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    goalId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        goalId: {
            type: Schema.Types.ObjectId,
            ref: "Goal",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Transaction: Model<ITransaction> =
    mongoose.models.Transaction ||
    mongoose.model<ITransaction>("Transaction", transactionSchema);

export default Transaction;