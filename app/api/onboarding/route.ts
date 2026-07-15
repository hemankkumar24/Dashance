import { NextRequest, NextResponse } from "next/server";
import { onboardingSchema } from "@/validations/onboarding";
import { verifyToken, generateToken } from "@/lib/jwt";
import { completeOnboarding } from "@/services/onboarding";

export async function POST(req: NextRequest) {
    try {
        // Get token
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

        // Verify JWT
        const payload = verifyToken(token);

        // Validate request body
        const body = await req.json();

        const result = onboardingSchema.safeParse(body);

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

        // Update user in database
        const user = await completeOnboarding(
            payload.userId,
            result.data
        );

        // Generate new token with updated onboarding status
        const newToken = generateToken({
            userId: user._id.toString(),
            email: user.email,
            onboardingComplete: user.onboardingComplete,
        });

        // Create response
        const response = NextResponse.json(
            {
                success: true,
                message: "Onboarding completed successfully.",
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    onboardingComplete: user.onboardingComplete,
                },
            },
            { status: 200 }
        );

        // Replace old cookie
        response.cookies.set("accessToken", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}