import { verifyToken } from "@/lib/jwt";
import { addTransaction } from "@/services/transactions";
import { transactionSchema } from "@/validations/transactions";
import { NextRequest, NextResponse } from "next/server";

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

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid input.",
                    errors: result.error,
                },
                { status: 400 }
            );
        }

        const userId = payload.userId;

        const transaction = await addTransaction({
            userId,
            title: result.data.title,
            amount: result.data.amount,
            category: result.data.category,
            type: result.data.type,
            goalId: result.data.goalId,
        })

        return NextResponse.json(
            {
                success: true,
                message: "Transaction added successfully.",
                transaction,
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