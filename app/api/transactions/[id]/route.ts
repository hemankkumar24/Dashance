import { verifyToken } from "@/lib/jwt";
import { deleteTransaction } from "@/services/deletetransaction";
import { updateTransaction } from "@/services/updatetransactions";
import { transactionSchema } from "@/validations/transactions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized." },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        const { id } = await params;

        await deleteTransaction({
            userId: payload.userId,
            transactionId: id,
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong.",
            },
            { status: 400 }
        );
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const token = req.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized." },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        const { id } = await params;

        const body = await req.json();

        const validatedData = transactionSchema.parse(body);

        const transaction = await updateTransaction({
            userId: payload.userId,
            transactionId: id,
            ...validatedData,
        });

        const updated = transaction.toObject();

        return NextResponse.json(
            {
                success: true,
                transaction: {
                    id: updated._id.toString(),
                    ...updated,
                }
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
                        : "Something went wrong.",
            },
            { status: 400 }
        );
    }
}