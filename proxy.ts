import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function proxy(req: NextRequest) {

    const pathname = req.nextUrl.pathname;
    const token = req.cookies.get("accessToken")?.value;

    const isAuthRoute =
        pathname.startsWith("/login") ||
        pathname.startsWith("/register");

    const isOnboardingRoute =
        pathname.startsWith("/onboarding");

    const isDashboardRoute =
        pathname.startsWith("/dashboard");

    // No token

    if (!token) {

        // Allow public routes

        if (isAuthRoute) {
            return NextResponse.next();
        }

        // Everything else requires login

        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {

        const payload = verifyToken(token);

        // Logged in but onboarding not complete

        if (!payload.onboardingComplete) {

            // Allow onboarding page

            if (isOnboardingRoute) {
                return NextResponse.next();
            }

            // Trying to access login/register/dashboard

            return NextResponse.redirect(new URL("/onboarding", req.url));
        }

        // Logged in and onboarding complete

        if (isAuthRoute || isOnboardingRoute) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return NextResponse.next();

    } catch {

        const response = NextResponse.redirect(new URL("/login", req.url));

        response.cookies.delete("accessToken");

        return response;
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/onboarding/:path*",
        "/login",
        "/register",
    ],
};