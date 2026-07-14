import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/services/register";
import { registerSchema } from "@/validations/auth";
import { generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        // has email and password
        const body = await req.json();

        // confirm if the schema is correct
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: validation.error.issues[0].message,
                },
                { status: 400 }
            );
        }


        // if yes sent to service function to create the acc
        const user = await registerUser(validation.data);

        const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
        });

        const response = NextResponse.json(
            {
                success: true,
            },
            { status: 201 }
        );

        response.cookies.set({
            name: "accessToken",
            value: token,
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