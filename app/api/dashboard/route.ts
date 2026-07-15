import { NextResponse } from "next/server";

export async function GET() {  
    try {
        const data = getUserData();
    }
    catch(error: any) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 400 }
        );
    }
}
