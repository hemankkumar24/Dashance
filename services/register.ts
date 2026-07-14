import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

interface RegisterInput {
    email: string;
    password: string;
}

export async function registerUser({
    email,
    password,
}: RegisterInput) {
    // wait for mongo connection
    await connectDB();

    // check email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
        email,
        password: hashedPassword,
    });

    return {
        _id: user._id.toString(),
        email: user.email,
        onboardingComplete: user.onboardingComplete
    };
}