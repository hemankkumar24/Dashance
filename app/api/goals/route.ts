import { verifyToken } from "@/lib/jwt";
import { createGoal } from "@/services/goals";
import { goalSchema } from "@/validations/goals";
import { NextResponse, NextRequest } from "next/server";

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
        const result = goalSchema.safeParse(body);

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

        const goal = await createGoal({
            userId: payload.userId,
            ...body,
        })

        return NextResponse.json({
            success: true,
            goal,
        });
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