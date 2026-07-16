import { verifyToken } from "@/lib/jwt";
import { getUserData } from "@/services/dashboard";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            throw new Error("Invalid Token");
        }

        const payload = verifyToken(token);

        const data = await getUserData(payload.userId);

        const { user, transactions, goals } = data;

        return NextResponse.json({
            user: {
                name: user.name,
                currentBalance: user.currentBalance,
                monthlyBudget: user.monthlyBudget,
            },
            transactions: transactions.map((transaction) => ({
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                goalId: transaction.goalId,
            })),
            goals: goals.map((goal) => ({
                title: goal.title,
                icon: goal.icon,
                targetAmount: goal.targetAmount,
                currentAmount: goal.currentAmount,
                archived: goal.archived,
            })),
        });
    }
    catch (error: any) {
        if (
            error instanceof Error &&
            error.message === "Invalid token."
        ) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    }
}
