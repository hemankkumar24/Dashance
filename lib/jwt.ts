import jwt from "jsonwebtoken";

// random string
const JWT_SECRET = process.env.JWT_SECRET!;

// for storing login information i assume
export interface TokenPayload {
    userId: string;
    email: string;
}

// creates a jwt token for retaining login
export function generateToken(payload: TokenPayload) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}

// verifying to ensure if the token is actually correct
export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}