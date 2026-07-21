import { verifyToken } from "@/lib/jwt";
import { deleteTransaction } from "@/services/deletetransaction";
import { addTransaction, getTransactions } from "@/services/transactions";
import { transactionSchema } from "@/validations/transactions";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {

    try {
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Session expired",
                },
                { status: 401 }
            );
        }

        const body = await req.json();
        const result = transactionSchema.safeParse(body);

        console.log("Success:", result.success);

        if (!result.success) {
            console.log("Issues:", result.error.issues);
            console.log("Flatten:", z.flattenError(result.error));
            console.log("Field Errors:", z.flattenError(result.error).fieldErrors);

            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid input.",
                    errors: z.flattenError(result.error).fieldErrors,
                },
                { status: 400 }
            );}

            const userId = payload.userId;

            const { transaction, goalCompleted, goalTitle, goalId } = await addTransaction({
                userId,
                title: result.data.title,
                amount: result.data.amount,
                category: result.data.category,
                type: result.data.type,
                goalId: result.data.goalId,
                createdAt: result.data.createdAt,
            })

            return NextResponse.json(
                {
                    success: true,
                    message: "Transaction added successfully.",
                    transaction,
                    goalCompleted,
                    goalTitle,
                    goalId
                },
                { status: 201 }
            );
        }
    catch (error) {
            console.error(error);

            return NextResponse.json(
                {
                    success: false,
                    message:
                        error instanceof Error
                            ? error.message
                            : "Internal Server Error",
                },
                { status: 500 }
            );
        }
    }

export async function GET(req: NextRequest) {
        try {
            const token = req.cookies.get("accessToken")?.value;

            if (!token) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Unauthorized",
                    },
                    { status: 401 }
                );
            }

            const payload = verifyToken(token);

            const { searchParams } = new URL(req.url);

            const page = Number(searchParams.get("page") ?? "1");
            const limit = Number(searchParams.get("limit") ?? "20");

            const { transactions, hasMore } = await getTransactions({
                userId: payload.userId,
                page,
                limit
            })

            return NextResponse.json(
                {
                    success: true,
                    message: "Transactions sent successfully.",
                    transactions: transactions.map((transaction) => ({
                        id: transaction.id,
                        title: transaction.title,
                        amount: transaction.amount,
                        type: transaction.type,
                        category: transaction.category,
                        goalId: transaction.goalId,
                        createdAt: transaction.createdAt,
                    })),
                    hasMore,
                },
                { status: 200 }
            );

        } catch (error) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        error instanceof Error
                            ? error.message
                            : "Internal Server Error",
                },
                { status: 500 }
            );
        }
    }

