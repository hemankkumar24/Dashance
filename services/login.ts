import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

interface loginInput {
    email: string;
    password: string;
}

export async function loginUser({
    email,
    password,
}: loginInput) {
    // wait for mongo connection
    await connectDB();

    // check email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Hash password
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        throw new Error("Invalid email or password.")
    }

    const token = generateToken({
        userId: user._id.toString(),
        email: user.email,
        onboardingComplete: user.onboardingComplete,
    });

    // generates jwt token for auth

    return {
        token,
        user,
    };

    
}