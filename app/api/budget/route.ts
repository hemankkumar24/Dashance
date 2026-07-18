import { verifyToken } from "@/lib/jwt";
import { updateBudget } from "@/services/updatebudget";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
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

        const result = await updateBudget(payload.userId, body);

        return NextResponse.json({
            success: true,
            updatedBudget: result
        })
    }
    catch(error) {
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