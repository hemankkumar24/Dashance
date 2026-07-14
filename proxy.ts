import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function proxy(req: NextRequest) {
    console.log("Middleware executed");
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        verifyToken(token);

        return NextResponse.next();
    }
    catch {
        return NextResponse.redirect(new URL("/login", req.url))
    }

}

// for these paths the middleware will be checked
export const config = {
    matcher: ["/dashboard/:path*"],
};