import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/services/login";
import { loginSchema } from "@/validations/auth";

export async function POST(req: NextRequest) {
    try {
        // has email and password
        const body = await req.json();

        // confirm if the schema is correct
        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: validation.error.issues[0].message,
                },
                { status: 400 }
            );
        }


        // if yes authenticate user and generate jwt
        const accessToken = await loginUser(validation.data);

        const response = NextResponse.json(
            {
                success: true,
            },
            { status: 200 }
        );

        response.cookies.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 400 }
        );
    }
}