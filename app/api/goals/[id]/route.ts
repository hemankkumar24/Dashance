import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { updateGoal } from "@/services/updategoal";
import { goalSchema } from "@/validations/goals";
import { deleteGoal } from "@/services/deletegoal";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        const body = goalSchema.parse(await req.json());

        const { id } = await params;

        const goal = await updateGoal({
            goalId: id,
            userId: payload.userId,
            ...body,
        });

        return NextResponse.json({
            success: true,
            goal,
        });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    message: err.message,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        const { id } = await params;

        await deleteGoal(id, payload.userId);

        return NextResponse.json({
            success: true,
        });
    } catch (err) {
        console.error(err);

        if (err instanceof Error) {
            return NextResponse.json(
                {
                    success: false,
                    message: err.message,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}